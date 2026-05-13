(function($){

    // Función para cargar entradas por categorías
    window.cargarEntradas = function(categories, mostrarModal = false){
        if(!categories || categories.length === 0){
            $('#containFiles .boxFiles').html('<p>No hay entradas</p>');
            return;
        }

        if(typeof categories === 'string'){
            categories = categories.split(',').map(Number);
        }

        // wp_localize_script('llamada', 'cubeAPI', array(
        //     'rest_url' => esc_url(rest_url('wp/v2/')) // importante el slash final
        // ));
        
        $.ajax({
            url: cubeAPI.rest_url + 'posts',
            method: 'GET',
            data: { categories: categories, per_page: 10 },
            success: function(posts){
                const boxFiles = $('#containFiles .boxFiles');
                boxFiles.empty();

                if(posts.length === 0){
                    boxFiles.html('<p>No hay entradas</p>');
                } else {
                    posts.forEach(post => {
                        const article = $(`
                            <article class="file-item file col" data-slug="${post.slug}">
                                <div class="icon"></div>
                                <div class="name">${post.title.rendered}</div>
                            </article>
                        `);
                        boxFiles.append(article);
                    });
                }

                if(mostrarModal){
                    $('#containFiles').addClass('visible');
                }
            },
            error: function(xhr){
                console.error('Error cargando entradas', xhr.responseText);
                $('#containFiles .boxFiles').html('<p>Error cargando entradas</p>');
            }
        });
    };

    // Cerrar modal de contenido de entrada
    $(document).on('click', '.modal-close', function(){
        $(this).closest('.modal').fadeOut();
    });

    // Cerrar modal si se hace click fuera del contenido
    $(window).on('click', function(e){
        if($(e.target).hasClass('modal')){
            $(e.target).fadeOut();
        }
    });

    // Click sobre un archivo para abrir modal de contenido
    $(document).on('click', '#containFiles .file-item', function(e){
        const slug = $(this).data('slug');
        if(!slug) return;

        $.ajax({
            url: cubeAPI.rest_url + 'posts',
            method: 'GET',
            data: { slug: slug },
            success: function(posts){
                if(posts.length === 0){
                    alert('No se encontró la entrada');
                    return;
                }
                const post = posts[0];
                $('#modal-title').html(post.title.rendered);
                $('#modal-content').html(post.content.rendered);
                $('#entradas-modal').fadeIn();
            },
            error: function(){
                alert('No se pudo cargar la entrada');
            }
        });
    });

    // Función para cerrar file manager desde JS
    window.cerrarFileManager = function(){
        $('#containFiles').removeClass('visible');
    };

    // Cerrar file manager SOLO al presionar Enter
    $(document).on('keydown', function(e){
        if(e.key === "Enter" && $('#containFiles').hasClass('visible')){
            $('#containFiles').removeClass('visible');
        }
    });

})(jQuery);

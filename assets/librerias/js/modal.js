(function ($) {
    $(document).on('click', '#entradas-lista li a', function (e) {
        e.preventDefault();

        let postUrl = $(this).attr('href');
        if (!postUrl) return;


        let urlParts = postUrl.split('/').filter(Boolean);
        let slug = urlParts[urlParts.length - 1];
        if (!slug) return;

        $.ajax({
            url: cubeAPI.rest_url,
            method: 'GET',
            data: { slug: slug },
            success: function (posts) {
                if (posts.length === 0) {
                    alert('No se encontró la entrada');
                    return;
                }
                let post = posts[0];
                $('#modal-title').html(post.title.rendered);
                $('#modal-content').html(post.content.rendered);
                $('#modal-link').attr('href', post.link);
                $('#entrada-modal').fadeIn();
            },
            error: function () {
                alert('No se pudo cargar la entrada');
            }
        });
    });
})(jQuery);

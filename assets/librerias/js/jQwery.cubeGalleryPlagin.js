(function ($) {
    // Exponer API global para la terminal
    window.cubeGalleryAPI = {
        rotateToCategory: rotateToCategory
    };

    $.fn.cubeGallery = function (options) {
        let settings = $.extend({
            caruselClass: "carusel",
            faceClass: "figure",
            axisRotate: "rotateX",
            width: 160,
            height: 160
        }, options);

        return this.each(function () {
            const $wrapper = $(this);
            const $carusel = $wrapper.find('.' + settings.caruselClass);
            const $faces = $carusel.find('.' + settings.faceClass);
            const count = $faces.length;
            if (count === 0) return;

            const angle = 360 / count;
            const translateZ = (settings.width / 2) / Math.tan(Math.PI / count);
            let rotation = 0;

            // Colocar caras
            $faces.each(function (i) {
                $(this).css({
                    transform: settings.axisRotate + '(' + (i * angle) + 'deg) translateZ(' + translateZ + 'px)'
                });
            });

            // Función para obtener cara frontal
            function getCaraFrontal() {
                let indexFrontal = Math.round(rotation / angle) % count;
                if (indexFrontal < 0) indexFrontal += count;
                return $faces.eq(indexFrontal);
            }

            function actualizarFrontal() {
                const $frontal = getCaraFrontal();
                $faces.removeClass('frontal-clickable');
                $faces.css('cursor', 'pointer');
                $frontal.addClass('frontal-clickable');
            }

            // Click sobre caras (funciona y abre modal)
         $faces.on('click', function(){
    let categoryIDs = $(this).data('category-ids'); // usar IDs directamente
    if(typeof categoryIDs === 'string') categoryIDs = JSON.parse(categoryIDs);

    if(window.cargarEntradas){
        window.cargarEntradas(categoryIDs, true);
    }
});



            // Guardamos variables para API global
            $wrapper.data('cubeGallery', {
                $carusel,
                $faces,
                angle,
                rotation,
                actualizarFrontal
            });

            actualizarFrontal();
        });
    };

    // Función global para rotar a una categoría (case-insensitive)
    function rotateToCategory(category, duration = 1500, callback) {
        $('.cube-wrapper').each(function () {
            const data = $(this).data('cubeGallery');
            if (!data) return;

            const { $carusel, $faces, angle } = data;

            // Buscar cara que tenga la categoría, ignorando mayúsculas
            let $targetFace = $faces.filter(function () {
                let cats = $(this).data('categories');
                if (typeof cats === 'string') cats = JSON.parse(cats);
                if (!cats) return false;

                let upperCats = cats.map(c => c.toString().toUpperCase());
                return upperCats.includes(category.toString().toUpperCase());
            }).first();

            if ($targetFace.length === 0) {
                console.warn('No se encontró cara con categoría:', category);
                return;
            }

            // Calcular rotación necesaria
            let index = $faces.index($targetFace);
            let targetRotation = index * angle;

            // Animar rotación usando CSS
            $carusel.css({
                transition: `transform ${duration}ms ease-in-out`,
                transform: `rotateX(${-targetRotation}deg)`
            });

            setTimeout(() => {
                // Actualizar variable de rotación interna
                data.rotation = -targetRotation;
                $carusel.css('transition', 'none');
                data.actualizarFrontal();

                if (callback) callback($targetFace);
            }, duration);
        });
    }

    $(document).ready(function () {
        $('.cube-wrapper').cubeGallery();
    });

})(jQuery);

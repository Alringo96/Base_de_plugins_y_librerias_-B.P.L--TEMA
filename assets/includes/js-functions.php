<?php

function js_functions()
{
    if (!is_admin()) {

        wp_register_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js', array(), '5.3.3', true);
        wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js', array(), '3.7.1', true);

        wp_register_script('gallerycube', get_template_directory_uri() . '/assets/librerias/js/jQwery.cubeGalleryPlagin.js', array('jquery'), '1', true);
        wp_register_script('llamada', get_template_directory_uri() . '/assets/librerias/js/ajax-api.js', array('jquery'), '1', true);
        wp_register_script('modal', get_template_directory_uri() . '/assets/librerias/js/modal.js', array('jquery'), '1', true);
        wp_register_script('main', get_template_directory_uri() . '/assets/librerias/js/main.js', array('jquery'), '1', true);

        wp_register_script('modal-file', get_template_directory_uri() . '/assets/librerias/js/modals-files.js', array(), '1', true);




        wp_enqueue_script('bootstrap-js');
        wp_enqueue_script('jquery');

        wp_enqueue_script('gallerycube');
        wp_enqueue_script('llamada');
        wp_enqueue_script('modal');
        wp_enqueue_script('main');

        wp_enqueue_script('modal-file');

        
        wp_localize_script('llamada', 'cubeAPI', array(
            'rest_url' => esc_url(rest_url('wp/v2/')) // importante el slash final
        ));
    }
}

add_action('wp_enqueue_scripts', 'js_functions');

<?php

function css_functions()
{
    wp_register_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', 'all');

    wp_register_style('gallerycube', get_template_directory_uri() . '/assets/librerias/css/gallery.css', 'all');
    wp_register_style('modal', get_template_directory_uri() . '/assets/librerias/css/modal.css', 'all');
    wp_register_style('style', get_template_directory_uri() . '/assets/librerias/css/style.css', 'all');



    wp_enqueue_style('bootstrap-css');

    wp_enqueue_style('gallerycube');
    wp_enqueue_style('modal');
    wp_enqueue_style('style');

}

add_action('wp_enqueue_scripts', 'css_functions');

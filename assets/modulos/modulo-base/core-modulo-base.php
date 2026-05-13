<?php
// functions.php

function crear_post_type_imagenes_cubo() {
    $labels = array(
        'name' => 'Imágenes del Cubo',
        'singular_name' => 'Imagen del Cubo',
        'menu_name' => 'Cubo 3D',
        'add_new' => 'Agregar nueva',
        'add_new_item' => 'Agregar nueva imagen',
        'new_item' => 'Nueva imagen',
        'edit_item' => 'Editar imagen',
        'view_item' => 'Ver imagen',
        'all_items' => 'Todas las imágenes',
        'search_items' => 'Buscar imágenes',
        'not_found' => 'No se encontraron imágenes',
        'not_found_in_trash' => 'No se encontraron imágenes en la papelera',
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => false,
        'rewrite' => array('slug' => 'imagenes-cubo'),
        'show_in_rest' => true,
        'rest_base' => 'imagenes_cubo', // nombre del endpoint
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'supports' => array('title', 'thumbnail'),
        'taxonomies' => array('category'),
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-format-gallery',
    );

    register_post_type('imagenes_cubo', $args);
}
add_action('init', 'crear_post_type_imagenes_cubo');

<?php
$temp = $wp_query;
$args = array(
    'post_type'      => 'imagenes_cubo',
    'orderby'        => 'date',
    'order'          => 'ASC',
    'posts_per_page' => -1
);
$wp_query = new WP_Query($args);

if ($wp_query->have_posts()) :
    while ($wp_query->have_posts()) : $wp_query->the_post();
        $mostrar = get_post_meta(get_the_ID(), '_cubo_mostrar_imagen', true);
        if ($mostrar !== '1') continue;

        $post_thumbnail_id  = get_post_thumbnail_id($post->ID);
        $post_thumbnail_url = wp_get_attachment_url($post_thumbnail_id);
        $post_thumbnail_alt = get_post_meta($post_thumbnail_id, '_wp_attachment_image_alt', true);
        ?>
        <div class="figure"><?php the_post_thumbnail() ?></div>
    <?php
    endwhile;
endif;
wp_reset_postdata();
$wp_query = $temp;
?>

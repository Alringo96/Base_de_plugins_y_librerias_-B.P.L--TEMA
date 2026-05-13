<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BPL
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<main id="primary" class="site-main">

	<section class="cube-wrapper">
		<a href="#" class="button up">▲</a>

		<div class="container-cube">
			<div class="carusel">
				<?php
				$args = array(
					'post_type' => 'imagenes_cubo',
					'posts_per_page' => -1,
					'orderby' => 'date',
					'order' => 'ASC'
				); // Quiero puro matarme, ayudaaaaaa :(
				$query = new WP_Query($args);
				if ($query->have_posts()):
					while ($query->have_posts()): $query->the_post();
						$categories = wp_get_post_terms(get_the_ID(), 'category', array('fields' => 'ids'));
						$categories_json = json_encode($categories);
				?>
						<div class="figure" data-categories='<?php echo $categories_json; ?>'>
							<?php if (has_post_thumbnail()) the_post_thumbnail('large'); ?>
						</div>
				<?php
					endwhile;
					wp_reset_postdata();
				endif;
				?>
			</div>
		</div>



		<a href="#" class="button down">▼</a>
	</section>
	</div>

	<!-- Crear nuevos archivos css -->
	<!-- Agregar nueva clase para el css -->
	<div id="entradas-modal" class="modal" style="display:none;">
		<div class="modal-content">
			<span class="modal-close">&times;</span>
			<h2>Plugins y Librerías</h2>
			<ul id="entradas-lista"></ul>
		</div>
	</div>


	<!-- Agregar nueva clase para el css -->
	<div id="entrada-modal" class="modal">
		<div class="modal-content">
			<span class="modal-close">&times;</span>
			<h2 id="modal-title"></h2>
			<div id="modal-content"></div>
		</div>
	</div>
	<!-- Gustavo a las 4:21AM:   https://www.youtube.com/watch?v=gZYbGbc9fWE -->>
</main>
</article><!-- #post-<?php the_ID(); ?> -->

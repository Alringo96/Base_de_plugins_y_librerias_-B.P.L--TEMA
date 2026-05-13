<?php

/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package BPL
 */

?>
<!-- Efecto CRT como capa separada -->
<div class="crt-effect"></div>

<!-- Capa para efectos glitch de Severance -->
<div class="severance-glitch" id="severanceGlitch"></div>

<div class="boot-log" id="bootLog"></div>

<div class="intro" id="intro">
  <div class="logo">
    <span class="logo-text">B.<span>P.</span>L.</span>
    <span class="logo-bg"></span>
    <span class="logo-circles"></span>
  </div>
</div>

<!-- Terminal vacío - se construirá completamente en JS -->
<div id="terminal"></div>

<div id="containFiles">
  <div class="boxFiles row row-cols-6">
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
    <article class="file-item file col">
      <div class="icon"></div>
      <div class="name">Plugins</div>
    </article>
  </div>
</div>

<div id="commandNotes" class="d-flex flex-column justify-content-between">
    <div>
      <h3>COMMANDS</h3>
      <div class="loader-commands">
        <div class="digit">0</div>
        <div class="digit">1</div>
        <div class="digit">0</div>
        <div class="digit">1</div>
        <div class="digit">1</div>
        <div class="digit">0</div>
        <div class="digit">0</div>
        <div class="digit">1</div>
        <div class="glow"></div>
      </div>
      <ul id="command" class="list-comand m-0 py-3">
      </ul>
    </div>
    <ul class="list-comand m-0 py-3">
      <li>HELP</li>
      <li>CLEAR</li>
      <li>REFRESH</li>
      <li>AUTHOR</li>
      <li>THEME</li>
      <li>FONTS</li>
      <li>WELLNESS</li>
    </ul>
  </div>


<section class="cube-wrapper">
  <div class="container-cube">
    <div class="carusel">
      <?php
      $args = array(
        'post_type' => 'imagenes_cubo',
        'posts_per_page' => -1,
        'orderby' => 'date',
        'order' => 'ASC'
      );
      $query = new WP_Query($args);

      if ($query->have_posts()):
        while ($query->have_posts()): $query->the_post();

          // Obtener nombres de las categorías
          $categories = wp_get_post_terms(get_the_ID(), 'category', array('fields' => 'names'));
          $categories_json = json_encode($categories); // ['ALFA','BRAVO']

          // Obtener IDs de las categorías
          $category_ids = wp_get_post_terms(get_the_ID(), 'category', array('fields' => 'ids'));
          $category_ids_json = json_encode($category_ids); // [2,5]

      ?>
          <div class="figure"
            data-categories='<?php echo $categories_json; ?>'
            data-category-ids='<?php echo $category_ids_json; ?>'>
            <?php if (has_post_thumbnail()) the_post_thumbnail('large'); ?>
          </div>
      <?php
        endwhile;
        wp_reset_postdata();
      endif;
      ?>


      ?>
    </div>
  </div>
</section>

<div id="containFiles">
  <span class="file-close">&times;</span> <!-- Botón para cerrar -->
  <div class="boxFiles row row-cols-6">
    <!-- Aquí se insertan dinámicamente los artículos con JS -->
  </div>
</div>

<!-- Modal para mostrar contenido de cada entrada -->
<div id="entradas-modal" class="modal" style="display:none;">
  <div class="modal-content">
    <span class="modal-close">&times;</span>
    <h2 id="modal-title">Título de la entrada</h2>
    <div id="modal-content">Contenido de la entrada</div>
  </div>
</div>
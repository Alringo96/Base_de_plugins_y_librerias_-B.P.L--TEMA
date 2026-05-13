<nav class="navbar navbar-expand-lg nav-mobil">
  <div class="container-fluid contenedor">
    <div class="ms-5"><?php the_custom_logo(); ?></div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse nav-bar-mobil collapse-horizontal" id="navbarNavDropdown">
      <i class="fa-solid fa-x"></i>
      <?php
      wp_nav_menu(array(
        'theme_location' => 'menu-superior-mobil',
        'menu_class'     => 'navbar-nav',
        'container'      => false,
        'depth'          => 2,
        'walker'         => new bootstrap_5_wp_nav_menu_walker(),
        'fallback_cb'    => 'bootstrap_5_wp_nav_menu_walker::fallback',
      ));
      ?>
      <div class="d-flex align-tiems-start mt-5 gap-4 rede">
         <i class="bi bi-x-lg"></i>
        <?php include get_template_directory() . '/assets/modulos/modulo-redes/loop-redes.php'; ?>
      </div>
    </div>
  </div>
</nav>
<div id="overlay-menu"></div>
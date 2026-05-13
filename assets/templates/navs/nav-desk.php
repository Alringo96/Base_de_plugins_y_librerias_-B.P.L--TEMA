<nav class="navbar navbar-expand-lg nav-desk">
  <div class="container-fluid contenedor">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <div class="ms-5"><?php the_custom_logo(); ?></div>
      <?php
      wp_nav_menu(array(
        'theme_location' => 'menu-superior',
        'menu_class'     => 'navbar-nav',
        'container'      => false,
        'depth'          => 2,
        'walker'         => new bootstrap_5_wp_nav_menu_walker(),
        'fallback_cb'    => 'bootstrap_5_wp_nav_menu_walker::fallback',
      ));
      ?>
      <div class="d-flex align-tiems-start gap-4 rede">
        <?php include get_template_directory() . '/assets/modulos/modulo-redes/loop-redes.php'; ?>
      </div>
    </div>
  </div>
</nav>
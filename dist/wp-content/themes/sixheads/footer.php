<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package sixheads
 */

?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
        <?php if ( has_nav_menu( 'social' ) ) : ?>
            <nav class="site-social__nav" role="navigation" aria-label="<?php _e( 'Footer Social Links Menu', 'sixheads' ); ?>">
                <?php
                    wp_nav_menu( array(
                        'theme_location' => 'social',
                        'menu_class'     => 'site-social__menu',
                        'depth'          => 1,
                        'link_before'    => '<span>', // add back in class="screen-reader-text"
                        'link_after'     => '</span>',
                    ) );
                ?>
            </nav><!-- .social-navigation -->
        <?php endif; ?>

		<div class="site-info">
			<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'sixheads' ) ); ?>"><?php printf( esc_html__( 'Proudly powered by %s', 'sixheads' ), 'WordPress' ); ?></a>
			<span class="sep"> | </span>
			<?php printf( esc_html__( 'Theme: %1$s by %2$s.', 'sixheads' ), 'sixheads', '<a href="http://www.sixheads.com" rel="designer">John Fry</a>' ); ?>
		</div><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>

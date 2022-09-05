<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Composer
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta name="google-site-verification" content="fncZWiemtO0bTaOevjmplBnZZfL6w9gt6hjO_gF9bio" />
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-143194842-1"></script>
		<script>
		  window.dataLayer = window.dataLayer || [];
		  function gtag(){dataLayer.push(arguments);}
		  gtag('js', new Date());

		  gtag('config', 'UA-143194842-1');
		</script>
		<script src="https://www.googleoptimize.com/optimize.js?id=OPT-5R6SJ2X"></script>
<style type="text/css">
.vc_btn3-size-lg{
font-size: 48px !important;
}
</style>

	<link rel="profile" href="http://gmpg.org/xfn/11">
	<?php composer_head(); ?>
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

	<?php wp_head(); ?>
	<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '762586141088890');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=762586141088890&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
</head>

<?php

	$composer_prefix = composer_get_prefix();

	if ( $composer_prefix != '' ) {

		if( is_home() || is_archive() || is_search() || is_404() ) {
			$composer_id = get_option('page_for_posts');
		}
		else if ( composer_is_shop() ) {
			$composer_id = wc_get_page_id( 'shop' );
		}
		else {
			global $wp_query; 
			$composer_id = ( 0 == get_the_ID() || NULL == get_the_ID() ) ? $wp_query->post->ID : get_the_ID();
		}

		$composer_boxed_content = composer_get_meta_value( $composer_id, '_amz_boxed_content', 'default', 'boxed_content', 'wide' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_header_layout = composer_get_meta_value( $composer_id, '_amz_header_layout', 'default', 'header_layout', 'header-1' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_header_hover_layout = composer_get_meta_value( $composer_id, '_amz_header_hover_layout', 'default', 'header_hover_layout', 'none' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_header_background_style = composer_get_meta_value( $composer_id, '_amz_header_background_style', 'default', 'header_background_style', 'light' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_header_line = composer_get_meta_value( $composer_id, '_amz_header_line', 'default', 'header_line', 'yes' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_transparent_header = composer_get_meta_value( $composer_id, '_amz_transparent_header', 'default', 'transparent_header', 'hide' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_transparent_header_opacity = composer_get_meta_value( $composer_id, '_amz_transparent_header_opacity', '', 'transparent_header_opacity', '0' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_top_header = composer_get_meta_value( $composer_id, '_amz_top_header', 'default', 'top_header', 'hide' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_top_header_position = composer_get_meta_value( $composer_id, '_amz_top_header_position', 'default', 'top_header_position', 'top' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_header_hide = composer_get_meta_value( $composer_id, '_amz_header_hide', 'default', 'header_hide', 'show' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_display_menu = composer_get_meta_value( $composer_id, '_amz_display_menu', 'default', 'display_menu', 'show' ); // id, meta_key, meta_default, themeoption_key, themeoption_default

		$composer_slider_shortcode = composer_get_meta_value( $composer_id, '_amz_slider_shortcode', '' );

	}

	// Empty Assignment
	$composer_sub_class = $composer_main_class = $composer_header_class = $composer_header_con_class = $composer_header_line_class = '';

	/* Pixel8es Ajaxify Full Site */
	$composer_ajaxtransin = composer_get_option_value( 'ajaxtransin', 'fadeInUp' );
	$composer_ajaxtransout = composer_get_option_value( 'ajaxtransout', 'fadeOutDown' );

	/* PreLoader animation */		
	$composer_preloadtrans = composer_get_option_value( 'preloadtrans', 'fadeInUp' );

	if( 'dark' === $composer_header_background_style ){
		$composer_header_class = ' dark ';
		$composer_header_con_class = ' dark-con ';
	}

	if( 'no' === $composer_header_line ){
		$composer_header_line_class = ' header-line-no ';
	}

	
	$composer_header_sticky = composer_get_option_value( 'header_sticky', 'scroll_up' );
	$composer_header_sticky_color = composer_get_option_value( 'header_sticky_color', 'light' );
	$composer_header_sticky_class = ( $composer_header_sticky_color === 'light' ) ? ' sticky-light ' : ' sticky-dark ';

	if( ( 'enable' === $composer_header_sticky || 'scroll_up' === $composer_header_sticky ) && $composer_header_layout != 'left-header' && $composer_header_layout != 'right-header' ){

		if( 'enable' === $composer_header_sticky ) {
			$composer_header_con_class .= ' pix-sticky-header';
		} elseif ( 'scroll_up' === $composer_header_sticky ) {
			$composer_header_con_class .= ' pix-sticky-header pix-sticky-header-scroll-up';
		}

	}		

	$composer_header_sticky_responsive = composer_get_option_value( 'header_sticky_responsive', 'disable' );

	if( 'enable' === $composer_header_sticky_responsive ) {		
		$composer_header_res_class = ' pix-sticky-header-res';
	} else {
		$composer_header_res_class = '';
	}

?>

	<body <?php body_class(); ?>>
		
		<?php 
			/* Preloader */
			composer_preloader();	

			if ( $composer_boxed_content === 'frame' ) {
				echo ' <span class="composer-inner-frame frame-left"></span><span class="composer-inner-frame frame-right"></span><span class="composer-inner-frame frame-top"></span><span class="composer-inner-frame frame-bottom"></span> ';
			}	
			
			// Mobile Navigation ( Menu Style light or dark for some header styles and for mobile navigation )
			$composer_main_menu = composer_get_option_value( 'main_menu', 'dark' );
			if( $composer_main_menu === 'light' ){
				$composer_main_class = ' menu-light ';
			} else{
				$composer_main_class = ' menu-dark ';
			}

			// Sub Menu Class - Dropdown menu light or dark
			$composer_sub_menu = composer_get_option_value( 'sub_menu', 'light' );

			if( 'dark' === $composer_sub_menu ){
				$composer_sub_class = ' sub-menu-dark ';
			}

			// Mobile Menu Enable or Disable Dropdown function
			$composer_mobile_menu_dropdown =  composer_get_option_value( 'mobile_menu_dropdown', 'yes' );
			if( $composer_mobile_menu_dropdown === 'no' ){
				$composer_mobile_menu_dropdown = ' mobile-menu-dropdown-none ';
			} else{
				$composer_mobile_menu_dropdown = '';
			}

			if( ! has_nav_menu( 'mobile-nav' )){
		?>

		<div class="mobile-menu-nav <?php echo esc_attr( $composer_main_class . $composer_mobile_menu_dropdown ); ?>"><div class="mobile-menu-inner"></div></div>
		<?php } else { ?>
			<div class="mobile-menu-nav <?php echo esc_attr( $composer_main_class . $composer_mobile_menu_dropdown ); ?>"><div class="mobile-menu-inner">
				<?php composer_mobile_nav(); ?>
			</div></div>			
		<?php } ?>

		<div id="content-pusher">

		<?php 
			if ( $composer_boxed_content === 'boxed' ) {
				echo '<div class="pix-boxed-content">';
			}
			
			if( $composer_header_layout == 'right-header' ){
				$composer_pagetop_class = 'right-header-top';
			}else {
				$composer_pagetop_class = '';
			}


			// Go to Top Button
			$composer_go_to_top = composer_get_option_value( 'go_to_top', 'enable' );
			$composer_go_to_top_mobile = composer_get_option_value( 'go_to_top_mobile', 'disable' );
			$composer_gototop_mobile_class = '';
			if ( 'disable' === $composer_go_to_top_mobile ) {	
				$composer_gototop_mobile_class = " hide-on-mobile";
			}
			if ( 'enable' === $composer_go_to_top ) {
				echo '<p id="back-top" class="'. esc_attr( $composer_pagetop_class ) .''. esc_attr( $composer_gototop_mobile_class ) .'"><a href="#top"><span class="pixicon-arrow-angle-up"></span></a></p>';
			}

			//Check if Blank Template, if yes remove header and footer
			$composer_page_slug =  get_page_template_slug(); 
			if ( 'templates/page-blank.php' != $composer_page_slug ) : 

				if( $composer_header_hide != 'hide' ) {

				//Header Drawer ( Header Widgets dropdown )
				get_template_part ( 'templates/headers/header-drawer' );

				if( 'show' === $composer_transparent_header ){
					echo '<div class="transparent-header opacity-'. esc_attr( $composer_transparent_header_opacity ) .'">';
				}

				if( 'default' == $composer_header_hover_layout ){
					$composer_header_hover_layout = '';
				}

				if ( isset ( $composer_slider_shortcode ) && ! empty ( $composer_slider_shortcode ) ) {
					echo do_shortcode ( $composer_slider_shortcode );
				}

				/* Header Wrapper Div */

				if( $composer_header_layout != 'left-header' && $composer_header_layout != 'right-header' ){
				?>
				<div class="header-wrap <?php echo esc_attr( $composer_header_hover_layout . $composer_header_class. $composer_header_line_class . $composer_sub_class ); ?>">

					<div class="header-con<?php echo esc_attr( $composer_header_sticky_class . $composer_header_con_class . $composer_header_res_class .' menu-'.$composer_header_layout . $composer_main_class ); ?>">

						<?php

							if($composer_header_layout == 'header-3'){
								echo '<div class="menu-header-3-con">';
							}

							if ( 'hide' === $composer_top_header && $composer_top_header_position === 'top' ){
								get_template_part ( 'templates/headers/header-info' );
							}
							
							get_template_part ( 'templates/headers/'. $composer_header_layout );

							if ( 'show' === $composer_top_header && $composer_top_header_position === 'bottom' ){
								get_template_part ( 'templates/headers/header-info' );
							}

							if($composer_header_layout == 'header-3'){
								echo '</div>';
							}

						?>
					</div>

				</div>

				<?php 
				}

				if( 'show' === $composer_transparent_header ){
					echo '</div>';
				}

		if( $composer_header_layout == 'left-header' || $composer_header_layout == 'right-header'){ 
			
			$lr_menu_alignment = composer_get_option_value( 'lr_menu_align', 'center' );
			if( $lr_menu_alignment == 'top' ){
				$lr_menu_class = ' top-nav-align';
			} else {
				$lr_menu_class = '';
			}

			$lr_text_alignment = composer_get_option_value( 'lr_text_align', 'left' );
			if( $lr_text_alignment == 'center' ){
				$lr_text_class = ' menu-on-center';
			} else {
				$lr_text_class = '';
			}

			$lr_menu_line = composer_get_option_value( 'lr_nav_line', 'yes' );
			if( $lr_menu_line == 'no' ){
				$lr_line_class = ' no-line-menu';
			} else {
				$lr_line_class = '';
			}
			?>

			<?php 
				if( $composer_header_layout == 'left-header' ){ 
					echo '<div class="main-side-left'. esc_attr( $composer_header_class ) . esc_attr( $composer_sub_class ) . esc_attr($lr_menu_class) . esc_attr($lr_text_class) . esc_attr($lr_line_class) .' '. esc_attr( $composer_header_hover_layout ) .'">';
				} 
				if( $composer_header_layout == 'right-header' ){ 
					echo '<div class="main-side-left main-side-right'. esc_attr( $composer_header_class ) . esc_attr( $composer_sub_class ) . esc_attr($lr_menu_class) .'">';
				}
			?>
			<div class="left-main-menu">
				<div class="menu-container">

					<?php  

					$composer_logo = composer_get_option_value( 'custom_logo', get_bloginfo( 'name' ) );

					$composer_logo_light = composer_get_option_value( 'custom_logo_light', get_bloginfo( 'name' ) );

					$composer_logo2x = composer_get_option_value( 'retina_logo', '' );

					$composer_logo_light2x = composer_get_option_value( 'retina_logo_light', '' );

					?>

					<div class="m-sticky">
						<div class="container">
							<div id="mobile-logo">	
								<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" itemprop="url">
									<?php 
										if ( $composer_logo != get_bloginfo('name') ) {
											echo '<img src="'.esc_url( $composer_logo ).'" data-rjs="'.esc_url( $composer_logo2x ).'" alt="">';
										}
										else {
											echo esc_html( $composer_logo );
										}
									?>
								</a>
							</div>
							<div class="pix-menu-trigger">
								<span class="mobile-menu"></span>
							</div>
						</div>
					</div>

					<?php echo composer_get_logo(); ?>

					<?php if( $composer_display_menu != 'hide' ) { ?>
						<div class="pix-menu">
							<div class="pix-menu-trigger">
								<span class="mobile-menu"><?php esc_html_e( 'Menu', 'composer' ); ?></span>
							</div>
						</div>
						
						<nav class="main-nav main-nav-left">
							<?php  composer_main_nav(); ?>
						</nav>
					<?php } ?>

					<div class="side-header-widget">
						<?php
						$composer_side_sorter = array( 
							"left" => array (
								"placebo" => "placebo", //REQUIRED!
								"sicons"      => "Social Icons",	
								"copyright_text" => "Copyright Text"
							)
						);
						$composer_side_sorter_left = composer_get_option_array_value('side_sorter','left', $composer_side_sorter['left'] );
						foreach ($composer_side_sorter_left as $key => $value) {
							composer_display_header_elements( $key, 'lang-list-wrap', 'page-top-main' );
						} 
						?>
					</div>
					
				</div>

			</div>
		<?php } 

			} // header_hide option close

			endif; //Blank template check ?>

		<div id="main-wrapper" class="clearfix" >
			<?php
			$composer_page_slug =  get_page_template_slug();

			if ( 'templates/page-blank.php' != $composer_page_slug ) {
				if ( ( ! is_front_page() || is_home() ) ) {

					composer_sub_banner( $composer_id, true ); // post id, echo
				}
			}
			?>
			<div id="wrapper" data-ajaxtransin="<?php echo esc_attr( $composer_ajaxtransin ); ?>" data-ajaxtransout="<?php echo esc_attr( $composer_ajaxtransout ); ?>" data-preloadtrans="<?php echo esc_attr( $composer_preloadtrans ); ?>">
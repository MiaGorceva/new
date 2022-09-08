<?php

/**
 * Disable error reporting
 *
 * Set this to error_reporting( -1 ) for debugging.
 */
error_reporting( 0 );

/** Set ABSPATH for execution */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __DIR__ ) . '/' );
}

define( 'WPINC', 'wp-includes' );

$protocol = $_SERVER['SERVER_PROTOCOL'];
if ( ! in_array( $protocol, array( 'HTTP/1.1', 'HTTP/2', 'HTTP/2.0' ), true ) ) {
	$protocol = 'HTTP/1.0';
}

$load = $_GET['load'];
if ( is_array( $load ) ) {
	ksort( $load );
	$load = implode( '', $load );
}

$load = preg_replace( '/[^a-z0-9,_-]+/i', '', $load );
$load = array_unique( explode( ',', $load ) );

if ( empty( $load ) ) {
	header( "$protocol 400 Bad Request" );
	exit;
}

require ABSPATH . '/noop.php';
require ABSPATH . WPINC . '/script-loader.php';

$expires_offset = 31536000; // 1 year.
$out            = '';

$wp_scripts = new WP_Scripts();
wp_default_scripts( $wp_scripts );
wp_default_packages_vendor( $wp_scripts );
wp_default_packages_scripts( $wp_scripts );


foreach ( $load as $handle ) {
	if ( ! array_key_exists( $handle, $wp_scripts->registered ) ) {
		continue;
	}

	$path = ABSPATH . $wp_scripts->registered[ $handle ]->src;
	$out .= get_file( $path ) . "\n";
}

echo $out;
exit;

<?php
/**
 * Plugin Name: dkjonah.com bridge
 * Description: Two small jobs for the headless site. (1) The host strips the Authorization header before WordPress sees it, so Application Passwords cannot log in over the REST API; this reads the login from a spare header or query parameter and hands it to WordPress. (2) When an essay or FAQ page is published or updated, it tells dkjonah.com to refresh, if DKJONAH_REVALIDATE_URL is defined in wp-config.php. Lives in wp-content/mu-plugins/ on cms.dkjonah.com.
 * Version: 5
 * Author: dkjonah.com build
 */

// ---- 1. Login passthrough ------------------------------------------------

if ( empty( $_SERVER['PHP_AUTH_USER'] ) ) {
	$raw = '';
	if ( ! empty( $_SERVER['HTTP_AUTHORIZATION'] ) ) {
		$raw = $_SERVER['HTTP_AUTHORIZATION'];
	} elseif ( ! empty( $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ) ) {
		$raw = $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
	} elseif ( ! empty( $_SERVER['HTTP_X_AUTHORIZATION'] ) ) {
		$raw = $_SERVER['HTTP_X_AUTHORIZATION'];
	} elseif ( ! empty( $_SERVER['HTTP_X_DK_AUTH'] ) ) {
		$raw = 'Basic ' . $_SERVER['HTTP_X_DK_AUTH'];
	} elseif ( ! empty( $_GET['dk_auth'] ) ) {
		$raw = 'Basic ' . $_GET['dk_auth'];
	}

	if ( $raw && 0 === stripos( $raw, 'Basic ' ) ) {
		$decoded = base64_decode( trim( substr( $raw, 6 ) ), true );
		if ( $decoded && false !== strpos( $decoded, ':' ) ) {
			list( $user, $pass )           = explode( ':', $decoded, 2 );
			$_SERVER['PHP_AUTH_USER']      = $user;
			$_SERVER['PHP_AUTH_PW']        = $pass;
			$_SERVER['HTTP_AUTHORIZATION'] = $raw;
		}
	}
}

if ( ! headers_sent() ) {
	header( 'X-Auth-Passthrough: 5' );
}

// ---- 2. Tell the site to refresh when content changes --------------------
// Add to wp-config.php, above the "That's all, stop editing" line:
//   define( 'DKJONAH_REVALIDATE_URL', 'https://dkjonah.com/api/revalidate?secret=YOUR_SECRET' );

function dkjonah_ping_site() {
	if ( ! defined( 'DKJONAH_REVALIDATE_URL' ) || ! DKJONAH_REVALIDATE_URL ) {
		return;
	}
	wp_remote_post( DKJONAH_REVALIDATE_URL, array( 'timeout' => 5, 'blocking' => false ) );
}

add_action(
	'transition_post_status',
	function ( $new_status, $old_status, $post ) {
		if ( ! in_array( $post->post_type, array( 'post', 'page' ), true ) ) {
			return;
		}
		if ( 'publish' === $new_status || 'publish' === $old_status ) {
			dkjonah_ping_site();
		}
	},
	10,
	3
);

add_action( 'deleted_post', 'dkjonah_ping_site' );
add_action( 'edited_category', 'dkjonah_ping_site' );

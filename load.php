<?php
session_start();

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

if ( ! defined( 'FUNC' ) ) {
	define( 'FUNC', 'functions/' );
}

require_once( ABSPATH . FUNC . 'koneksi.php' );
require_once( ABSPATH . FUNC . 'custom.php' );
require_once( ABSPATH . FUNC . 'user.php' );

$base_url = 'http://'.$_SERVER['HTTP_HOST'].'/latihan/komen-ajax';

?>

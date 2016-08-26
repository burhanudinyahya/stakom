<?php

/** Define ABSPATH as this file's directory */
// if ( ! defined( 'ABSPATH' ) ) {
// 	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
// }
//
// // define( 'FUNC', 'function' );


require_once( ABSPATH . './function/koneksi.php' );
require_once( ABSPATH . './function/custom.php' );


$_SESSION['user'] = 1;

if(! isset($_SESSION['user'])){
	header ('Location: login.php');
}

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

ini_set('date.timezone', 'Asia/Jakarta');

include_once 'function/custom.php';
?>

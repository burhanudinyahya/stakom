<?php

if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

if ( ! defined( 'FUNC' ) ) {
	define( 'FUNC', 'function/' );
}


require_once( ABSPATH . FUNC . 'koneksi.php' );
require_once( ABSPATH . FUNC . 'custom.php' );


$_SESSION['user'] = 1;

if( ! isset($_SESSION['user']) ){
	header ('Location: login.php');
}

?>

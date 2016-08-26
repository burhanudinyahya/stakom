<?php
echo dirname( __FILE__ );

/** Define ABSPATH as this file's directory */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

define( 'WPINC', 'wp-includes' );

print_r(ABSPATH);

?>

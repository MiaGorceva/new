<?php
define('WP_CACHE', true); // WP-Optimize Cache
 // WP-Optimize Cache
 // WP-Optimize Cache
 // WP-Optimize Cache
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'mite_club');
/** MySQL database username */
define('DB_USER', 'mite');
/** MySQL database password */
define('DB_PASSWORD', '3N9u6N9l');
/** MySQL hostname */
define('DB_HOST', 'localhost');
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '9MC^pcFN31@x0!TFxHU6cQky3brDcJoO3(bJOdL^(xuyN2RQnmeFd(9hkUdANc@M');
define('SECURE_AUTH_KEY',  'wG2ZjquKIlzkiXL5pgcDT7ECTW4Lbjz*ljf)!yV!OvXel^b22NU93fNb1SIFrcX8');
define('LOGGED_IN_KEY',    'LBGe@V8eYhrFv04R*LlUPoUm8wK*Xc*Fff6JD%fgdA@Z%Rn@QOYrwxt)Iu9r%MUM');
define('NONCE_KEY',        'aMkX^zgGaU1BK&yf9v8*!55nnN07elGublj7513*aMx%AgrpDWcOs5CnvfPhMaIO');
define('AUTH_SALT',        'MzgreUnca1SBZ^EBbB0vx!fD8^ZMY@5B5lZeg607gZ%kI3LJzoRQ*&(pXzEPB1)t');
define('SECURE_AUTH_SALT', '99%NS*%iK7pe&n3I7EtkSmoOfdfFdE(LrGThpRS*EtqW1i@dvx!#Xa2hvvf0ZM1x');
define('LOGGED_IN_SALT',   '&v*9rPYloi*F(@Z*RhdL672ocP@pouo^yQOH(7%lwyibU3UfGImi05QgZFoLmM1F');
define('NONCE_SALT',       'Sb%C5ZrohmEhYo(ENoiUh7&@cUNV@lPoIbeQZ4V^xW7BI7UHmmpAAuYGw^(YsHR&');
define('WP_HOME','https://mite.club');
define('WP_SITEURL','https://mite.club');
/**#@-*/
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);
/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
define( 'WP_ALLOW_MULTISITE', true );
define ('FS_METHOD', 'direct');
define ('WP_MEMORY_LIMIT', '128MB');
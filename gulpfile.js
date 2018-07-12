const gulp = require( 'gulp' );
const nodemon = require( 'gulp-nodemon' );
const gulpLoadPlugins = require( 'gulp-load-plugins' );
const del = require( 'del' );
const browserSync = require( 'browser-sync' ).create();
const gulpsync = require( 'gulp-sync' )( gulp );          // For sync tasks
const $ = gulpLoadPlugins();
const message = require( 'gulp-message' );                // used for debugging
const babel = require( 'gulp-babel' );

gulp.task( 'sass', function() {
//	message.debug( 'sass' );
	gulp.src( './app/sass/*.*' )
	    .pipe( $.plumber() )
	    .pipe( $.sourcemaps.init() )
	    .pipe( $.sass.sync().on( 'error', $.sass.logError ) )
	    .pipe( $.autoprefixer( { browsers: [ 'last 2 versions' ] } ) )
	    .pipe( gulp.dest( '.tmp/css' ) )
	    .pipe( gulp.dest( 'app/public/css' ) )
	    .pipe( $.sass( { outputStyle: 'compressed' } ) )
	    .pipe( $.rename( { suffix: '.min' } ) )
	    .pipe( $.sourcemaps.write( './' ) )
	    .pipe( gulp.dest( '.tmp/css' ) )
	    .pipe( gulp.dest( './app/public/css' ) )
	    .pipe( browserSync.stream() );
} );

gulp.task( 'clean', del.bind( null, [ '.tmp', '.dist' ] ) );

gulp.task( 'watch', function() {
	gulp.watch( 'app/sass/**/*.*', [ 'sass' ] );
	gulp.watch( 'app/js/main/*.js', [ 'scripts', 'scripts-min' ] );
	gulp.watch( 'app/js/vendor/vendor.js', [ 'vendor-scripts' ] );
} );

gulp.task( 'scripts', function() {
	return gulp.src( 'app/js/main/*.js' )
	           .pipe( babel( {
		                         presets: [ 'env' ]
	                         } ) )
	           .pipe( $.plumber() )
	           .pipe( $.sourcemaps.init() )
	           .pipe( $.concat( 'main.js' ) )
	           .pipe( $.sourcemaps.write( '.' ) )
	           .pipe( gulp.dest( '.tmp/js' ) )
	           .pipe( gulp.dest( './app/public/js' ) );
} );

gulp.task( 'scripts-min', function() {
	return gulp.src( 'app/js/main/*.js' )
	           .pipe( babel( {
		                         presets: [ 'env' ]
	                         } ) )
	           .pipe( $.plumber() )
	           .pipe( $.sourcemaps.init() )
	           .pipe( $.concat( 'main.min.js' ) )
	           .pipe( $.uglify() )
	           .pipe( $.sourcemaps.write( '.' ) )
	           .pipe( gulp.dest( '.tmp/js' ) )
	           .pipe( gulp.dest( './app/public/js' ) );
} );

gulp.task( 'vendor-scripts', function() {
	const vendorfile = require( './app/js/vendor/vendor.js' );
	const vendorJs = vendorfile.vendorJs;
	gulp.src( vendorJs )
	    .pipe( $.plumber() )
	    .pipe( $.concat( 'vendor.js' ) )
	    .pipe( gulp.dest( '.tmp/js' ) )
	    .pipe( $.rename( 'vendor.min.js' ) )
	    .pipe( $.uglify() )
	    .pipe( gulp.dest( '.tmp/js' ) )
	    .pipe( gulp.dest( './app/public/js' ) );
} );

gulp.task( 'nodemon', function( cb ) {
	let called = false;
	return nodemon(
		{
			script: 'bin/www',
			ext   : 'js ejs coffee',
			stdout: false
		} )
	.on( 'start', function onStart() {
		// ensure start only got called once
		if( !called ) {
			called = true;
			cb();
		}
	} )
	.on( 'restart', function onRestart() {
		// reload connected browsers after a slight delay
		setTimeout( function reload() {
			browserSync.reload(
				{
					stream: false
				} );
		}, 500 );
	} );
} );

gulp.task( 'browser-sync', [ 'nodemon' ], function() {

	// for more browser-sync config options: http://www.browsersync.io/docs/options/
	browserSync.init(
		{
			proxy        : 'http://localhost:4000/index',
			// informs browser-sync to use the following port for the proxied app
			// notice that the default port is 4000, which would clash with our expressjs
			port         : 3000,
			injectChanges: true,
			reloadDelay  : 250
		} );
} );

gulp.task( 'copy-to-dist', function() {
	gulp.src( [ 'app/public/**/*', '.tmp/**/*' ] )
	    .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'copy-to-public', function() {
	gulp.src( [ '.tmp/**/*' ] )
	    .pipe( gulp.dest( './app/public' ) );
} );

gulp.task( 'reload', function() {
	browserSync.reload();
} );

gulp.task( 'serve', gulpsync.sync(
	[
		'clean',
		'sass',
		'scripts',
		'scripts-min',
		'vendor-scripts',
		'copy-to-public',
		'browser-sync',
		'watch'
	] ) );

gulp.task( 'build', gulpsync.sync(
	[
		'clean',
		'sass',
		'scripts',
		'scripts-min',
		'vendor-scripts',
		'copy-to-dist'
	] ) );

gulp.task( 'default', [
	'serve'
] );

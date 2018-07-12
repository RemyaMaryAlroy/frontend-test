const express = require( 'express' );
const app = express();
const request = require( 'request' );
const router = express.Router();
const fs = require( 'fs' );
var path = require( 'path' );

app.use( express.static( 'public' ) );

router.get( '/:page', function( req, res ) {

	var viewData = {
		pageName   : req.url,
		headerData : fs.readFileSync( 'data/header.json', 'utf-8', function( err, data ) {
			return JSON.parse( data );
		} ),
		contentData: fs.readFileSync( 'data/' + req.params.page + '.json', 'utf-8', function( err, data ) {
			return JSON.parse( data );
		} ),
		footerData : fs.readFileSync( 'data/footer.json', 'utf-8', function( err, data ) {
			return JSON.parse( data );
		} )
	};

	res.render( '../app/views/index', viewData, function( err, html ) {

		if( err ) {
			if( err.message.indexOf( 'Failed to lookup view' ) !== -1 ) {
				res.render( "error", {
					message: err.message,
					error  : { status: err.status, stack: err.stack }
				} );
			}
			throw err;
		}
		res.send( html );

	} );
} );

module.exports = router;
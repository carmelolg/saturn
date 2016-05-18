var copy = require( 'copy-to' );

copy( require( './fileA' ) )
  .and( require( './fileB' ) )
  .to( module.exports );

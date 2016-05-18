var winston = require( 'winston' );
winston.emitErrs = true;

var timestampFormatter = function () {
  return new Date().toISOString()
    .replace( /T/, ' ' )
    .replace( /Z/, '' );
};

var logger = new winston.Logger( {
  transports: [
    new winston.transports.Console( {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      prettyPrint: true,
      timestamp: timestampFormatter
    } )
  ],
  exitOnError: false
} );
module.exports = logger;

'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');


var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// it's important to register the livereload middleware
// after any response-processing middleware like compress,
// but before any middleware serving actual content
var livereload = process.env.LIVE_RELOAD;

if (livereload) {
  app.middleware('initial:after', require('connect-livereload')({
    port: livereload
  }));
}

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  console.log('entro');
  if (err){
    throw err;
  }

  // start the server if `$ node server.js`
  if (require.main === module){
    app.start();
  }
});

module.exports = function(app) {

  var routes = require('lib/app').routes;

  routes.forEach(function(route) {
    app.get(route, function(req, res) {
      //TODO: Gestire con middleware se client/index.html o dist/index.html
      res.sendFile(require.resolve('../../client/index.html'));
    });
  });
};

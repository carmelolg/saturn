angular.module('saturnApp')
  .config(function(LoopBackResourceProvider) {
    // Use a custom auth header instead of the default 'Authorization'
    LoopBackResourceProvider.setAuthHeader('X-Access-Token');
  });

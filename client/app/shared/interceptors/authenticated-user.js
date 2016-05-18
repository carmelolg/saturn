'use strict';

/**
 * @ngdoc factory
 * @name saturnApp.authenticatedUser
 * @description
 * # authenticatedUser
 * Interceptor that check status of http request in the saturnApp.
 */
angular.module('saturnApp')
  .factory('authenticatedUser', ['$q', '$location', 'LoopBackAuth',
    function ($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
          switch (rejection.status) {
            case 403:
              clear();
              $location.path('/error/403');
              break;
            case 401:
              clear();
              $location.nextAfterLogin = $location.path();
              $location.path('/login');
              break;
          }
          return $q.reject(rejection);
        }
      };

      function clear() {
        LoopBackAuth.clearUser();
        LoopBackAuth.clearStorage();
      }
    }]);

angular.module('saturnApp')
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authenticatedUser');
  }]);

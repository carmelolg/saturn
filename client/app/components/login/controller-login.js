'use strict';

/**
 * @ngdoc function
 * @name LoginController
 * @description
 * Controller utilizzato per effettuare il login al sistema
 */
angular.module('saturnApp')
  .controller('LoginController', ['$scope', '$state', 'Utente', '$localStorage',
    function ($scope, $state, Utente, $localStorage) {

      // reset ga
      $localStorage.gaUser = undefined;

      if (Utente.isAuthenticated()) {
        $state.go('app.home');
      }

      $scope.login = function () {
        Utente.login($scope.credentials,
          function (data) {
            // save in the session storage gaUser if is present
            var gaUser = data.user.gaUser;
            if (gaUser) {
              $localStorage.gaUser = gaUser;
            }

            $state.go('app.home');
          },
          function (err) {
            console.error(err);
            $state.go('login');

          }
        );
      };
    }
  ]);

'use strict';

angular
  .module('saturnApp')
  .directive('sidebar', directive);

directive.$inject = [];

function directive() {
  var sidebar = {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/shared/directives/sidebar/sidebar.html'
  };
  return sidebar;
}

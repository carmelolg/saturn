'use strict';

angular
  .module('saturnApp')
  .directive('sidebar', directive);

directive.$inject = [];

function directive() {
  var sidebar = {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/components/sidebar/view-sidebar.html'
  };
  return sidebar;
}

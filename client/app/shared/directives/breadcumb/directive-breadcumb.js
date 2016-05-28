'use strict';

angular.module('saturnApp').directive('breadcumb', breadcumb);

breadcumb.$inject = ['$state'];

/* @ngInject */
function breadcumb($state) {

  var directive = {
    restrict: 'E',
    templateUrl: 'app/shared/directives/breadcumb/view-breadcumb.html',
    scope: {
    },
    link: linkFn
  };

  return directive;

  function linkFn(scope, el, attr, ctrl) {
    scope.tree = [];
    $state.current.breadcumb.forEach(function(elem){
      scope.tree.push(elem);
    });
  }
}

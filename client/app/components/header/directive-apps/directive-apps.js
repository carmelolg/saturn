'use strict';

angular.module('saturnApp').directive('apps', apps);

/* @ngInject */
function apps() {

  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/header/directive-apps/view-apps.html',
    scope: {

    },
    link: linkFn,
    // controller: Controller,
    // bindToController: true
  };

  return directive;

  function linkFn(scope, el, attr, ctrl) {

  }
}

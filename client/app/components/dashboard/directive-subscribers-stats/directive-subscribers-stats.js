'use strict';

angular.module('saturnApp').directive('subscribersStats', subscribersStats);

/* @ngInject */
function subscribersStats() {

  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/dashboard/directive-subscribers-stats/view-subscribers-stats.html',
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

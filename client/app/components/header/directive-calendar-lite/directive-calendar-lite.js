'use strict';

angular.module('saturnApp').directive('calendarLite', calendarLite);

/* @ngInject */
function calendarLite() {

  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/header/directive-calendar-lite/view-calendar-lite.html',
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

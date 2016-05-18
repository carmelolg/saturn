'use strict';

angular.module('saturnApp').directive('notifications', notifications);

/* @ngInject */
function notifications() {

  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/header/directive-notifications/view-notifications.html',
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

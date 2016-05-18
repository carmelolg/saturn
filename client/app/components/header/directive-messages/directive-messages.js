'use strict';

angular.module('saturnApp').directive('messages', messages);

/* @ngInject */
function messages() {

  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/header/directive-messages/view-messages.html',
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

'use strict';

angular.module('saturnApp').directive('todoList', todoList);

/* @ngInject */
function todoList() {

  var directive = {
    restrict: 'E',
    templateUrl: 'app/shared/directives/todo/view-todo.html',
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

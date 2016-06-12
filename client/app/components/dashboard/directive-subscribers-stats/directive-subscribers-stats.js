'use strict';

angular.module('saturnApp').directive('subscribersStats', subscribersStats);

subscribersStats.$inject = [];
/* @ngInject */
function subscribersStats() {

  var directive = {
    restrict: 'E',
    templateUrl: 'app/components/dashboard/directive-subscribers-stats/view-subscribers-stats.html',
    scope: {},
    controller: 'SubscribersStatsController'
  };

  return directive;

}

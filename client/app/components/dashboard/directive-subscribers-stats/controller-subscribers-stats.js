'use strict';

angular.module('saturnApp').controller('SubscribersStatsController', SubscribersStatsController);

SubscribersStatsController.$inject = ['$scope', 'Mailchimp'];

/* @ngInject */
function SubscribersStatsController($scope, Mailchimp) {

  // Public varibles
  $scope.totalMembers = 0;
  $scope.totalLists = 0;
  $scope.totalLastMonth = 0;
  $scope.totalLastYear = 0;

  _init();

  function _init(){
    Mailchimp.countTotalMembers(function(data){
      $scope.totalMembers = data.totalMembers;
      $scope.totalMembersLastMonth = data.totalMembersLastMonth;
      $scope.totalMembersLastYear = data.totalMembersLastYear;
    }, function(err){
      console.error(err);
    });
    Mailchimp.getAllLists(function(lists){
      $scope.totalLists = lists.total;
    }, function(err){
      console.error(err);
    });
  }
}

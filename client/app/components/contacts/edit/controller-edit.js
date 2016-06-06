'use strict';

angular.module('saturnApp').controller('EditContactController', EditContactController);

EditContactController.$inject = ['$scope', '$stateParams', '$state', 'contactsPanelService', 'Contact'];

/* @ngInject */
function EditContactController($scope, $stateParams, $state, contactsPanelService, Contact) {

  $scope.contact = {};
  $scope.categories = [];

  $scope.save = save;

  function save(){
    Contact.upsert($scope.contact, function(info){
      $state.go('app.contacts.panel');
    }, function(err){
      console.error(err);
    });
  }

  _init();

  function _init(){
    Contact.findById({id: $stateParams.id}, function(_contact){
      $scope.contact = angular.copy(_contact);
      contactsPanelService.getAllCategories(function(_categories){
        $scope.categories = angular.copy(_categories);
      });
    });
  }

}

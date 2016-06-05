'use strict';

angular.module('saturnApp').controller('EditContactController', EditContactController);

EditContactController.$inject = ['$scope', '$stateParams', 'contactsPanelService', 'Contact'];

/* @ngInject */
function EditContactController($scope, $stateParams, contactsPanelService, Contact) {

  $scope.contact = {};
  $scope.categories = [];

  _init();

  function _init(){
    Contact.findById({id: $stateParams.id}, function(_contact){
      $scope.contact = angular.copy(_contact);
      contactsPanelService.getAllCategories(function(_categories){
        console.log(_categories);
        $scope.categories = angular.copy(_categories);
      });
    });
  }

}

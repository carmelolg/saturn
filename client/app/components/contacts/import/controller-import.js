'use strict';

angular.module('saturnApp').controller('importContactController', importContactController);

importContactController.$inject = ['$scope', 'contactsPanelService', 'Contact'];

/* @ngInject */
function importContactController($scope, contactsPanelService, Contact) {

  $scope.contact = {};
  $scope.categories = [];

  $scope.save = save;

  function save() {
    Contact.create($scope.contact, function(instance) {
      //TODO check integrity fields
      Contact.address.create({id: instance.id}, $scope.contact.address, function(instance){
        $scope.contact = angular.copy({});
        console.log(instance.id + ' created.');
      });
    }, function(err) {
      console.error(err);
    });
  }

  _init();

  function _init() {
    contactsPanelService.getAllCategories(function(_categories) {
      $scope.categories = angular.copy(_categories);
    });
  }

}

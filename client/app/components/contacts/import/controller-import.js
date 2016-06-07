'use strict';

angular.module('saturnApp').controller('importContactController', importContactController);

importContactController.$inject = ['$scope', 'contactsPanelService', 'fileService', 'layoutService', 'Contact'];

/* @ngInject */
function importContactController($scope, contactsPanelService, fileService, layoutService, Contact) {

  // Variables
  $scope.contact = {};
  $scope.categories = [];

  // Public functions
  $scope.readFileContent = readFileContent;
  $scope.importFile = importFile;
  $scope.save = save;

  // Init function
  _init();

  // Implementation
  function readFileContent($fileContent) {
    $scope.fileContent = $fileContent;
  }


  function importFile() {
    if($scope.fileContent){
      fileService.importCSV($scope.fileContent, function(result){
        layoutService.alert(result.length + ' contacts imported.');
      }, function(err){
        console.error(err);
        layoutService.alert('Ops. Something was wrong. ');
      });
    }
  }

  function save() {
    //TODO check integrity fields
    Contact.create($scope.contact, function(instance) {
      //TODO check integrity fields
      Contact.address.create({
        id: instance.id
      }, $scope.contact.address, function(instance) {
        $scope.contact = angular.copy({});
        layoutService.alert(instance.name + ' ' + instance.surname + ' created.');
      }, function(err){
        console.error(err);
        layoutService.alert('Ops. Something was wrong. Check the address on form.');
      });
    }, function(err) {
      console.error(err);
      layoutService.alert('Ops. Something was wrong. Check the fields please.');
    });
  }


  function _init() {
    contactsPanelService.getAllCategories(function(_categories) {
      $scope.categories = angular.copy(_categories);
    });
  }

}

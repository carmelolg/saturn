'use strict';

/**
 * @ngdoc function
 * @name saturnApp.controller:HomeController
 * @description
 * # ContactsPanelController
 * Controller of the saturnApp
 */
angular.module('saturnApp')
  .controller('ContactsPanelController', ContactsPanelController);

ContactsPanelController.$inject = ['$scope', '$window', 'contactsPanelService', 'layoutService', 'ConstantUtils', 'Contact', 'Category'];

function ContactsPanelController($scope, $window, contactsPanelService, layoutService, ConstantUtils, Contact, Category) {

  // Variables
  $scope.list = [];
  $scope.categories = [];
  $scope.filters = {};

  // Public methods
  $scope.search = search;
  $scope.call = call;
  $scope.sendMail = sendMail;
  $scope.edit = edit;
  $scope.delete = deleteItem;

  // Utils methods

  // Other methods
  _init();

  function _init() {

    contactsPanelService.getAllCategories(function(categories) {
      if (!categories) {
        // alert error
      } else {
        $scope.categories = categories;
      }
    });

    contactsPanelService.findContactsWithCategory(function(data) {
      $scope.list = data;
    });
  }

  function search() {
    contactsPanelService.search($scope.filters, function(data) {
      $scope.list = data;
    });
  }

  function call(phone) {
  }

  function sendMail() {}

  function edit() {

  }

  function deleteItem(id, index) {
    layoutService.alertOnDelete(function(swalAlert) {
      Contact.deleteById({
        id: id
      }, function(data) {
        swalAlert();
        $scope.list.splice(index, 1);
      }, function(err) {
        console.error(err);
        layoutService.alert('Something was wrong.');
      });
    });
  }
}

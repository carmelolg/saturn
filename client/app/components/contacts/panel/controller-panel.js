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

ContactsPanelController.$inject = ['$scope', '$window', 'contactsPanelService', 'ConstantUtils', 'Contact', 'Category'];

function ContactsPanelController($scope, $window, contactsPanelService, ConstantUtils, Contact, Category) {

  // Variables
  $scope.list = [];
  $scope.categories = [];
  $scope.filters = {};

  // Public methods
  $scope.search = search;

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

  function search(){

    contactsPanelService.search($scope.filters, function(data){
      $scope.list = data;
    });
  }
}

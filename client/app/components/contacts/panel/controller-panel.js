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

  // Public methods

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

}

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
  $scope.filter = {};
  $scope.filtersSelectable = contactsPanelService.fields;
  $scope.filtersSelected = [];
  $scope.hiddenfiltersSelected = [];
  $scope.categories = [];

  // Public methods
  $scope.addFilter = addFilter;
  $scope.removeFilter = removeFilter;
  $scope.addCategory = addCategory;
  $scope.openExternalLink = openExternalLink;
  $scope.thereIsAFilter = thereIsAFilter;
  $scope.search = search;

  // Other methods
  _init();

  function addFilter() {
    if ($scope.filter.key && $scope.filter.value) {

      _addFilter($scope.filter.key, $scope.filter.value);
      _addHideFilter($scope.filter.key, $scope.filter.value);

      // Reset
      $scope.filter = angular.copy({});
    }
  }

  function removeFilter(index) {
    $scope.filtersSelected.splice(index, 1);
  }

  function addCategory(category) {
    Category.findOne({
      filter: {
        where: {
          id: category
        }
      }
    }, function(data){
      _addFilter('category', data.name);
      _addHideFilter('categoryId', category);
      $scope.filter = angular.copy({});
    });
  }

  function openExternalLink(link) {
    $window.open(ConstantUtils.PRE_URL_HTTP + link);
  }

  function thereIsAFilter() {
    return ($scope.filter.key !== undefined && $scope.filter.key !== null);
  }

  function search() {

    contactsPanelService.search($scope.hiddenfiltersSelected, function(result) {
      $scope.list = result;
      $scope.hiddenfiltersSelected = angular.copy([]);
      $scope.filtersSelected = angular.copy([]);
    }, function(err) {
      console.error(err);
    });
  }

  //Private methods
  function _addFilter(key, value) {

    var found = false;
    $scope.filtersSelected.forEach(function(filter) {
      if (filter.key === key) {
        filter.value = value;
        found = true;
      }
    });

    if (!found) {
      var _object = {};
      _object.key = key;
      _object.value = value;
      $scope.filtersSelected.push(_object);
    }
  }

  function _addHideFilter(key, value) {

    var found = false;
    $scope.hiddenfiltersSelected.forEach(function(filter) {
      if (filter.key === key) {
        filter.value = value;
        found = true;
      }
    });

    if (!found) {
      var _object = {};
      _object.key = key;
      _object.value = value;
      $scope.hiddenfiltersSelected.push(_object);
    }
  }

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

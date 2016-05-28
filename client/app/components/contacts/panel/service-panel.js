'use strict';

angular.module('saturnApp')
  .factory('contactsPanelService', contactsPanelService);

contactsPanelService.$inject = ['Contact', 'Category'];

/* @ngInject */
function contactsPanelService(Contact, Category) {
  // Factory object
  var factory = {};

  factory.findContactsWithCategory = findContactsWithCategory;
  factory.getAllCategories = getAllCategories;
  factory.search = search;

  function findContactsWithCategory(cb) {
    Contact.getContactsWithCategory(cb);
  }

  function getAllCategories(cb) {
    Category.find(function(data) {
      cb(data);
    }, function(err) {
      cb(null);
    });
  }

  function search(filters, cb) {
    var where = {};
    
    Object.keys(filters).forEach(function(key) {
        var toFindLike = '.*' + filters[key] + '.*';
        where[key] = {
          like: toFindLike
        };
      });

    Contact.searchByFilter(where, cb);
  }


  return factory;

}

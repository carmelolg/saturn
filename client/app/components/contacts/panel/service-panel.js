'use strict';

angular.module('saturnApp')
  .factory('contactsPanelService', contactsPanelService);

contactsPanelService.$inject = ['Contact', 'Category'];

/* @ngInject */
function contactsPanelService(Contact, Category) {
  // Factory object
  var factory = {};

  factory.fields = [{
    text: 'Nome',
    value: 'name'
  }, {
    text: 'Cognome',
    value: 'surname'
  }, {
    text: 'e-Mail',
    value: 'email'
  }, {
    text: 'Citta',
    value: 'city'
  }, {
    text: 'Regione',
    value: 'region'
  }, {
    text: 'Stato',
    value: 'country'
  }];

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

    filters.forEach(function(filter) {
      var toFindLike = '.*' + filter.value + '.*';
      where[filter.key] = {
        like: toFindLike,
        options: 'i'
      };
    });

    Contact.searchByFilter(where, cb);
  }


  return factory;

}

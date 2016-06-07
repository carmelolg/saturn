'use strict';

angular.module('saturnApp').factory('fileService', fileService);

fileService.$inject = ['Contact'];

/* @ngInject */
function fileService(Contact) {

  // Factory object
  var factory = {};

  factory.importCSV = importCSV;

  function importCSV(file, success, error){
    var opt = {};
    opt.file = file;
    Contact.importCSV(opt, success, error);
  }

  return factory;

}

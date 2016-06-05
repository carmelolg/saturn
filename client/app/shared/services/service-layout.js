'use strict';

angular.module('saturnApp').factory('layoutService', layoutService);

layoutService.$inject = ['$q', 'SweetAlert'];

/* @ngInject */
function layoutService($q, SweetAlert) {
  var factory = {};

  factory.alert = alert;
  factory.alertOnDelete = alertOnDelete;

  function alert(message) {
    SweetAlert.swal(message);
  }

  function alertOnDelete(deleteFn){
    SweetAlert.swal({
      title: 'Are you sure?',
      text: 'Item will be deleted',
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
    }, function() {

      var swalFn = function(){
        SweetAlert.swal('Deleted!');
      };
      deleteFn(swalFn);

    });

  }

  return factory;
}

var logger = require('lib/logger');
var csvHelper = require('csv-string');
var async = require('async');

module.exports = function(app) {

  var factory = {};

  var categoriesCache = {};

  //Models
  var Contact = app.models.Contact;
  var Category = app.models.Category;

  factory.importCSV = importCSV;

  function importCSV(file, cb) {

    var separator = csvHelper.detect(file);
    var fileMap = csvHelper.parse(file, separator);
    fileMap.splice(0, 1); // Header spliced
    //TODO to add in constant file
    var header = ['name','surname', 'eMail', 'phone', 'website', 'category'];

    var perform = function(row, callback) {
      var contact = {};
      row.forEach(function(field, index) {
        contact[header[index]] = field;
      });
      if (contact.category) {
        if(categoriesCache[contact.category]){
          contact.categoryId = categoriesCache[contact.category];
          delete contact.category;
          Contact.upsertByContact(contact, function(err, instance) {
            if(err){
              callback(err);
            }else{
              callback(null, instance);
            }
          });
        }else{
          Category.findCategoryIDByName({
            name: contact.category
          }, function(err, idCategory) {
            if (err) {
              callback(err);
            } else {
              categoriesCache[contact.category] = idCategory;
              contact.categoryId = idCategory;
              delete contact.category;
              Contact.upsertByContact(contact, function(err, instance) {
                if(err){
                  callback(err);
                }else{
                  callback(null, instance);
                }
              });
            }
          });
        }
      }else{
        Contact.upsertByContact(contact, function(err, instance) {
          if(err){
            callback(err);
          }else{
            callback(null, instance);
          }
        });
      }
    };

    var done = function(err, result) {
      if(err){
        cb(err);
      }else{
        cb(null, result);
      }
    };

    async.mapLimit(fileMap, 30, perform, done);
  }

  return factory;

};

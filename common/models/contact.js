var _ = require('underscore');
var fileUtils = require('lib/file');

module.exports = function(Contact) {

  var fileUtilsInstance;

  // perform any setup that requires the app object
  Contact.on('attached', function(app) {
    app.on('started', function() {
      fileUtilsInstance = fileUtils(app);
    });
  });

  function getContactsWithCategory(cb) {
    Contact.find({
      include: 'category'
    }, function(errDesc, data) {
      if (errDesc) {
        cb(errDesc);
        return;
      }
      cb(null, data);
    });
  }

  function searchByFilter(filters, cb) {
    var _where = {};

    _where = _.clone(filters);

    Contact.find({
      include: {
        relation: 'category'
      },
      where: _where
    }, function(errDesc, data) {
      if (errDesc) {
        cb(errDesc);
        return;
      }
      cb(null, data);
    });
  }

  function importCSV(obj, cb) {
    fileUtilsInstance.importCSV(obj.file, cb);
  }

  function upsertByContact(contact, cb) {
    Contact.findOne({
      where: {
        name: contact.name,
        eMail: contact.eMail
      }
    }, function(err, contactOnDb) {
      if (err) {
        cb(err);
        return;
      } else {
        if (contactOnDb) {
          Contact.upsert(contactOnDb, function(err, instance) {
            if (err) {
              cb(err);
            } else {
              cb(null, instance);
            }
          });
        } else {
          Contact.create(contact, function(err, instance) {
            if (err) {
              cb(err);
            } else {
              cb(null, instance);
            }
          });
        }
      }
    });
  }

  Contact.getContactsWithCategory = getContactsWithCategory;
  Contact.searchByFilter = searchByFilter;
  Contact.importCSV = importCSV;
  Contact.upsertByContact = upsertByContact;

  // Public methods
  Contact.remoteMethod(
    'getContactsWithCategory', {
      description: 'Ritorna la lista dei contatti inclusa la categoria',
      returns: {
        arg: 'data',
        type: 'array',
        root: true
      },
      http: {
        verb: 'get',
        path: '/getContactsWithCategory'
      }
    }
  );

  Contact.remoteMethod(
    'searchByFilter', {
      description: 'Search',
      accepts: {
        arg: 'obj',
        type: 'object',
        http: {
          source: 'body'
        }
      },
      returns: {
        arg: 'data',
        type: 'array',
        root: true
      },
      http: {
        verb: 'post',
        path: '/searchByFilter'
      }
    }
  );

  Contact.remoteMethod(
    'importCSV', {
      description: 'Importa un file CSV',
      accepts: {
        arg: 'obj',
        type: 'object',
        http: {
          source: 'body'
        }
      },
      returns: {
        arg: 'data',
        type: 'array',
        root: true
      },
      http: {
        verb: 'post',
        path: '/importCSV'
      }
    }
  );
};

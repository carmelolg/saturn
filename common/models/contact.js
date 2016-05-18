var _ = require('underscore');

module.exports = function(Contact) {

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

    // Find category id if it's present
    if (filters.category) {
      var _name = filters.category;
      filters.category = {
        name: _name
      };
    }

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

  Contact.getContactsWithCategory = getContactsWithCategory;
  Contact.searchByFilter = searchByFilter;

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
};

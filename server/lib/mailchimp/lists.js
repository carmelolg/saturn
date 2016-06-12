var async = require('async');
var mcapi = require('mailchimp-api/mailchimp');
var MailchimpConstant = require('server/bin/constant').MailchimpConstant;

module.exports = {
  Lists: function(app) {

    var mc = new mcapi.Mailchimp(MailchimpConstant.MAILCHIMP_API_KEY);

    //Factory object
    var factory = {};

    // Public methods
    factory.getAllLists = getAllLists;
    factory.getListById = getListById;
    factory.getAllListsWithMembers = getAllListsWithMembers;
    factory.countTotalMembers = countTotalMembers;

    // Implementations
    function getAllLists(cb) {
      // { total: number, data: lists}
      mc.lists.list({}, function(lists) {
        cb(null, lists);
      }, function(err) {
        cb(err);
      });
    }

    function getListById(id, cb) {
      mc.lists.members({
        id: id
      }, function(members) {
        // { total: number, data: members}
        cb(null, members);
      }, function(err) {
        cb(err);
      });
    }

    function getAllListsWithMembers(cb) {
      var dataStructure = [];
      getAllLists(function(err, lists) {
        if (err) {
          cb(err);
        } else if (lists.data) {

          var perform = function(list, callback) {
            getListById(list.id, function(err, members) {
              if (err) {
                callback(err);
              } else {
                var object = {};
                object.infoList = list;
                object.members = members;
                dataStructure.push(object);
                callback();
              }
            });
          };

          var done = function(err, results) {
            if (err) {
              cb(err);
            } else {
              cb(null, dataStructure);
            }
          };

          async.map(lists.data, perform, done);
        } else {
          cb(err || new Error('Something was wrong.'));
        }
      });
    }

    function countTotalMembers(cb) {
      getAllListsWithMembers(function(err, data) {
        if (err) {
          cb(err);
        } else {
          var totalMembers = 0;
          var totalMembersLastMonth = 0;
          var totalMembersLastYear = 0;
          var perform = function(object, callback) {
            if (object.members && object.members.total) {
              totalMembers += object.members.total;
            }
            object.members.data.forEach(function(member) {
              var date = new Date(Date.parse(member.timestamp));

              // TODO mailchimp api - return 25 items !?!?!?!
              if (date.getMonth() === new Date().getMonth()) {
                totalMembersLastMonth++;
              }
              if (date.getFullYear() === new Date().getFullYear()) {
                totalMembersLastYear++;
              }
            });

            callback();
          };

          var done = function(err, results) {
            if (err) {
              cb(err);
            } else {
              cb(null, {
                totalMembers: totalMembers,
                totalMembersLastMonth: totalMembersLastMonth,
                totalMembersLastYear: totalMembersLastYear
              });
            }
          };

          async.map(data, perform, done);

        }
      });
    }

    return factory;

  }
};

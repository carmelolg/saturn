var mcapi = require('lib/mailchimp');
var campaignsLib = mcapi.Campaigns;
var listsLib = mcapi.Lists;

module.exports = function(Mailchimp) {

  var campaignsInstance;
  var listsInstance;

  Mailchimp.on('attached', function(app) {
    app.on('started', function() {
      campaignsInstance = campaignsLib(app);
      listsInstance = listsLib(app);
    });
  });

  function getAllCampaigns(cb){
    campaignsInstance.getAllCampaigns(cb);
  }

  function getAllListsWithMembers(cb){
    listsInstance.getAllListsWithMembers(cb);
  }

  function countTotalMembers(cb){
    listsInstance.countTotalMembers(cb);
  }

  Mailchimp.getAllCampaigns = getAllCampaigns;
  Mailchimp.getAllListsWithMembers = getAllListsWithMembers;
  Mailchimp.countTotalMembers = countTotalMembers;

  // Public methods
  Mailchimp.remoteMethod(
    'getAllCampaigns', {
      description: 'Get all mailchimp\'s campaigns',
      returns: {
        arg: 'data',
        type: 'object',
        root: true
      },
      http: {
        verb: 'get',
        path: '/getAllCampaigns'
      }
    }
  );

  Mailchimp.remoteMethod(
    'getAllListsWithMembers', {
      description: 'Get all mailchimp\'s list with members',
      returns: {
        arg: 'data',
        type: 'array',
        root: true
      },
      http: {
        verb: 'get',
        path: '/getAllListsWithMembers'
      }
    }
  );

  Mailchimp.remoteMethod(
    'countTotalMembers', {
      description: 'Count how many members are in mailchimp',
      returns: {
        arg: 'data',
        type: 'object',
        root: true
      },
      http: {
        verb: 'get',
        path: '/countTotalMembers'
      }
    }
  );
};

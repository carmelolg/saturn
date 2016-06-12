var mcapi = require('mailchimp-api/mailchimp');
var MailchimpConstant = require('server/bin/constant').MailchimpConstant;

module.exports = {
  Campaigns: function(app) {

    var mc = new mcapi.Mailchimp(MailchimpConstant.MAILCHIMP_API_KEY);

    //Factory object
    var factory = {};

    // Public methods
    factory.getAllCampaigns = getAllCampaigns;
    factory.getCampaignById = getCampaignById;

    // Implementations
    function getAllCampaigns(cb) {
      mc.campaigns.list({}, function(campaigns) {
        if (campaigns) {
          cb(null, campaigns);
        }
      }, function(err) {
        cb(err);
      });
    }

    function getCampaignById(id, cb){
      //TODO doesn't work, I don't know why yet
      mc.campaigns.list({campaign_id: id}, function(campaign) {
        if (campaign) {
          cb(null, campaign);
        }
      }, function(err) {
        cb(err);
      });
    }

    return factory;

  }
};

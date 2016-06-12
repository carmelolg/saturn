var mcapi = require('mailchimp-api/mailchimp');
var MailchimpConstant = require('server/bin/constant').MailchimpConstant;

module.exports = {
  Reports: function(app) {

    var mc = new mcapi.Mailchimp(MailchimpConstant.MAILCHIMP_API_KEY);

    //Factory object
    var factory = {};

    // Public methods
    factory.getReportByCampaignId = getReportByCampaignId;

    // Implementations
    function getReportByCampaignId(idCampaign, cb){
      mc.reports.summary({cid:idCampaign}, function(report) {
        if (report) {
          cb(null, report);
        }
      }, function(err) {
        cb(err);
      });
    }

    return factory;

  }
};

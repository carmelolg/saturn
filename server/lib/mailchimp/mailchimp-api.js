//   mc.lists.list({}, function(listData) {
//     var list = listData.data[1];
//     console.log(list);
//     mc.lists.members({
//       id: list.id
//     }, function(memberData) {
//       console.log(memberData.data);
//     }, function(error) {
//       console.log(error);
//     });
//   });
// }
var mcapi = require('mailchimp-api/mailchimp');

module.exports = function(app){
  // var mc = new mcapi.Mailchimp('81bf93ec6d1ab60ee2accd065ead8c74-us13');

  //Factory object
  var factory = {};
  // Public methods
  factory.getAllCampaigns = getAllCampaigns;

  // Implementations
  function getAllCampaigns(){
    // mc.campaigns.list({}, function(campaignData) {
    // var campaigns = campaignData.data;


    // mc.reports.summary({cid:req.params.id}, function(reportData) {
    //   res.render('reports/view', { title: 'Report for '+campaign.title, campaign: campaign, report:reportData });
    // }, function (error) {
    //   console.log(error);
    //   if (error.name == "Campaign_DoesNotExist") {
    //     req.session.error_flash = "The campaign does not exist";
    //   } else if (error.error) {
    //     req.session.error_flash = error.code + ": " + error.error;
    //   } else {
    //     req.session.error_flash = "An unknown error occurred";
    //   }
    //   res.redirect('/reports');
    // });
  // });
  }
  return factory;

};

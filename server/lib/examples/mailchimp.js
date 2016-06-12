var mcapi = require('../mailchimp');
var server = require('server/server');
var http = require('http');
var MailchimpConstant = require('server/bin/constant').MailchimpConstant;

var campaignsLib = mcapi.Campaigns;
var listsLib = mcapi.Lists;
var campaignsInstance = campaignsLib(server);
var listsInstance = listsLib(server);

listsInstance.getAllMembers(function(err, lists){
  // console.log(lists);
});

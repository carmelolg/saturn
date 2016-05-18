var mcapi = require('../mailchimp');
var server = require('server/server');

console.log(mcapi(server).getAllCampaigns());

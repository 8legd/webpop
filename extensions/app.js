/**
 * WebPop app
 */
webpop = true;

CONFIG = require('config');
// This is the production config file - not added to GitHub
// Create your own config.js in the WebPop extensions directory
// For a list of the expected values see the config.js in the root
CONFIG = CONFIG && CONFIG.options;

// nodify our WebPop app
require('nodify');

var routing_strategy = require('routing_strategy');

/**
 * Basic routing strategy that works in node.js and WebPop
 */
exports.get = exports.post = {
    "*": function() {
        routing_strategy.basic(request,response);
    }
};
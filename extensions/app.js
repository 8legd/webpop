/**
 * WebPop app
 */
webpop = true;

CONFIG = require('config').options;

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
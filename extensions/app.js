/**
 * WebPop app
 */
webpop = true;

// nodify our WebPop app
require('./nodify/index');

var router = require('./routes/strategy').create({
    // Add any libraries used in the routes here...
});

/**
 * Basic routing strategy that works in node.js and WebPop
 */
exports.get = exports.post = {
    "*": function() {
        strategy.basic(request,response);
    }
};
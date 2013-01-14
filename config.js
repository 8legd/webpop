// This is the development config file (for local testing in node.js)
// Defaults to production values (./extensions/config.js)
var config = require('./extensions/config');

if (!config.options) {
    config.options = {};
    // Dropbox
    config.options.dropbox = {};
    config.options.dropbox.app_key = "Your Dropbox App key";
    config.options.dropbox.app_secret = "Your Dropbox App secret";
    config.options.dropbox.oauth_callback = "http://thecallback/for/oauth";
    // Tumblr
    config.options.tumblr = {};
    config.options.tumblr.app_key = "Your Tumblr App key";
    config.options.tumblr.app_secret = "Your Tumblr App secret";
    config.options.tumblr.oauth_callback = "http://thecallback/for/oauth";
    // etc...
}

// You probably want to override some stuff for testing too!
config.options.dropbox.oauth_callback = "http://127.0.0.1:3000/webpop/dropbox/access";


exports.options = config.options;

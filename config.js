// This is the development config file (for local testing in node.js)
// Defaults to production values (./extensions/config.js)
var config = require('./extensions/config');

if (!config.options) {
    config.options = {};

    // Datastore
    options.data_store = {
        impl: "cubby", // required: cubby | mysql-cubby
        host: 'mysql', // required for mysql connection if using mysql-cubby
        user: 'root', // required for mysql connection if using mysql-cubby
        password: 'password', // required for mysql connection if using mysql-cubby
        database: 'webpop', // required for mysql connection if using mysql-cubby
        table: "storage", // optional table name if using mysql-cubby (defaults to `cubby`)
        name: "test" // optional record PK if using mysql-cubby (defaults to `default`)
    }

    // Dropbox
    config.options.dropbox = {
        app_key: "Your Dropbox App key",
        app_secret: "Your Dropbox App secret",
        oauth_callback: "http://live/callback/for/oauth"
    };

    // Tumblr
    config.options.tumblr = {
        app_key: "Your Tumblr App key",
        app_secret: "Your Tumblr App secret",
        oauth_callback: "http://live/callback/for/oauth"
    };

    // etc...
}

// You probably want to override some stuff for testing too!
config.options.dropbox.oauth_callback = "http://127.0.0.1:3000/webpop/oauth/callback";

exports.options = config.options;

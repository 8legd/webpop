var dropbox = require('../../../../web_apis/dropbox');

exports.GET = function(req,res) {
    // callback(error, oauth_token, oauth_token_secret, results)
    var service = dropbox.create();
    service.requestRequestToken(function(error, oauth_token, oauth_token_secret, results) {
        if(error) {
            // :( TODO error
            res.send(500);
        }
        else {
            req.session.req_oauth_token = oauth_token;
            req.session.req_oauth_token_secret = oauth_token_secret;
            req.session.req_oauth_token_ts = new Date().toJSON();
            res.redirect(service.buildAuthURL(oauth_token));
        }
    });
}
var dropbox = require('../../../../web_apis/dropbox');

exports.GET = function(req,res) {
    if (req.query.oauth_token == req.session.req_oauth_token) {
        // :)
        req.session.req_oauth_token = null;
        var req_oauth_token_secret = req.session.req_oauth_token_secret;
        req.session.req_oauth_token_secret = null;

        req.session.req_oauth_token_ts = new Date().toJSON();

        var req_oauth_token_ts_json = req.session.req_oauth_token_ts;
        var req_oauth_token_ts = new Date(req_oauth_token_ts_json);
        // TODO check this is not  stale

        //Dropbox ID
        var uid = req.query.uid;
        if (req.query.not_approved && req.query.not_approved == 'true') {
            // to not approved flow
        } else {
            var service = dropbox.create({
                oauth_request_token: req.query.oauth_token,
                oauth_request_token_secret: req_oauth_token_secret
            });
            // callback(error, oauth_access_token, oauth_access_token_secret, results)
            service.requestAccessToken(function(error, oauth_access_token, oauth_access_token_secret, results) {
                //TODO store the access token
                console.log('TODO store the access token');
            });
        }
    } else {
        // :( TODO error
        res.send(500);
    }

}
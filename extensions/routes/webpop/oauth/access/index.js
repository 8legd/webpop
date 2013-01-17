var dropbox = require('../../../../web_apis/dropbox');
var data_store = require('../../../../data_store/index');
var security = require('../../../../security/index');

exports.GET = function(req,res) {
    data_store.get('user',function(value,error) {
        var user_data = security.decrypt(value);
        var service = dropbox.create({
            oauth_access_token: user_data.oauth_access_token,
            oauth_access_token_secret: user_data.oauth_access_token_secret
        });
        var cursor = null; // TODO check storage for last cursor
        service.requestDelta(cursor,function(error, data, response) {
            if(error) {
                // :( TODO error
                res.send(500);
            }
            else {
                res.send(data);
            }
        });
    });
}
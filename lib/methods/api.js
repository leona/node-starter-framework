var request = require('request');
var uti     = require('../lib/utilities');

var details = require('../../../details.json');

var client_url = details.client_url;
var api_key = details.api_key;

var api = function() {
    this.api_url        = client_url + 'admin/api/';
    this.client_api_url = client_url;
    this.api_key        = api_key;

    return this;
}

api.prototype.call = function(action, data, callback, error) {
    request.post(this.api_url, {
        form: {
            action: action,
            api_key: this.api_key,
            data: data
        }
    }, function(err, response, body) {
        try {
            body = JSON.parse(body);
        } catch(e) {
            console.log(e);
            return error();
        }
        
        if (!err && response.statusCode == 200) {
            callback(err, response, body);
        } else {
            error();
        }
    });
}

api.prototype.clientCall = function(action, data, callback, error) {
    var req_data  = {
            action: action,
            ajax_request: 'true'
    };
    
    req_data = uti.objMerge(req_data, data);

    request.post(this.client_api_url, {
        form: req_data
    },
    function(err, response, body) {
        try {
            body = JSON.parse(body);
        } catch(e) {
            console.log(e);
            return error();
        }
        
        if (!err && response.statusCode == 200) {
            callback(err, response, body);
        } else {
            error();
        }
    });
}

module.exports = new api;
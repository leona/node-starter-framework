var Cookies = require('cookies');

module.exports = function() {
    var token_store = [];
    var app = function() {}

    app.prototype.adminAuth = function(req, res, next) {
        var cookies = new Cookies(req, res);
        var token = cookies.get('auth_token');

        if (uti.defined(token) && token.length == 128 && token_store.indexOf(token) > -1) {
            res.authenticated = true;
        } else {
            res.authenticated = false;
        }
        
        next();
    }

    app.prototype.authenticate = function() {
        var token = uti.random(128);
        
        token_store.push(token);
        cookies.set("auth_token", token, { httpOnly: false });
    }
    
    return new app
}()
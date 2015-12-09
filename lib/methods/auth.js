var Cookies = require('cookies');

module.exports = function() {
    var token_store = [];
    var app = function() {}
/*
    setInterval(function() {
        token_store.map(function(item) {
            if (item < uti.time - )
        });
    }, 1000 * 60 * 10);
    */
    
    app.prototype.apiAuth = function(req, res, next) {
        
    }
    app.prototype.adminAuth = function(req, res, next) {
        var cookies = new Cookies(req, res);
        var token = cookies.get('auth_token');

        if (uti.defined(token) && token.length == 128 && typeof token_store[token] !== 'undefined') {
            res.authenticated = true;
            token_store[token] = uti.time();
        } else {
            res.authenticated = false;
        }
        
        next();
    }


    app.prototype.authenticate = function() {
        var token = uti.random(128);
        
        if (typeof token_store[token] !== 'undefined') 
            return authenticate();
            
        token_store[token] = uti.time();
        
        cookies.set("auth_token", token, { httpOnly: false });
    }
    
    return new app
}()


module.exports = function() {
    
    var store = {};
    
    function app() {}
    
    app.prototype.func = function(key, ttl, callback, done, on_disk) {
        if (typeof store[key] == 'undefined') {
            set();
        } else {
            if (store[key].time < (Date.now() / 1000) -  ttl) {
                set();
            } else {
                done(store[key].data);
            }
        }
        
        function set() {
            callback(function(result) {
                store[key] = {}
                store[key].time = Date.now() / 1000;
                store[key].data = result;
                
                done(result);
            });
        }
    }
    
    app.prototype.set = function() {
        
    }
    
    app.prototype.get = function() {
        
    }
    
    return new app;
}();
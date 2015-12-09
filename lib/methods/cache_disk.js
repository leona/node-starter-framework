var fs = require('fs');
var uti = require(__methods + 'utilities').prototype;
var md5 = require('md5');

module.exports = function() {
    var config = {
        dir: __base + 'db'
    }
    
    function app() {}
    
    app.prototype.get = function(key, callback) {
        var filename = this.name(key);
        //console.log(filename);
        try {
            if (typeof callback !== 'undefined') {
                fs.readFile(filename, function(err, result) {

                    if (typeof result !== 'undefined' && result !== null && result !== '') {
                        result = JSON.parse(result.toString());
                    } else {
                        result = null;
                    }
                    
                    callback(result);
                });
            } else {
                var result = fs.readFileSync(filename);
                
                if (result == '')
                    result = null;
                    
                if (result !== null)  {
                    result = JSON.parse(result.toString());
                }
                
                return result;
            }
        } catch(e) {
            if (typeof callback !== 'undefined') {
                callback(null);
                return console.log(e);
            } else {
                console.log(e);
                return null;
            }
        }
    
    }
    
    app.prototype.set = function(key, data) {
        fs.writeFile(this.name(key), JSON.stringify(data));
    }
    
    app.prototype.append = function(key, data) {
        var old = this.get(key)
        
        if (typeof old == 'object' && old !== null && typeof old.length == 'undefined') {
            old = [old];
        }
        
        if (old !== null) {
            old.push(data)
            this.set(key, old);
        } else {
            this.set(key, data);
        }
    }
    
    app.prototype.name = function(key) {
        return config.dir + '/' + md5(key);
    }
    
    return new app;
}()
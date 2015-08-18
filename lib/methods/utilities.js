var utilities = function() {
    
}

utilities.prototype.debug = function(msg) {
    console.log(msg);
}

utilities.prototype.log = function(key, obj) {
    console.log(obj);
}

utilities.prototype.forEach = function(obj, callback) {
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
           //var obj = obj[key];
            callback(key, obj[key]);
        }
    }
}

utilities.prototype.defined = function(val) {
    if (typeof val !== 'undefined' && val.length > 0) return true;
}

module.exports = utilities;
var utilities = function() {
    
}

utilities.prototype.debug = function(msg) {
    console.log(msg);
}

utilities.prototype.log = function(key, obj) {
    console.log(obj);
}

module.exports = utilities;
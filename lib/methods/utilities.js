var utilities = function() {
    return this;
}

utilities.prototype.debug = function(msg) {
    console.log(msg);
}

utilities.prototype.log = function(key, obj) {
    console.log(obj);
}


utilities.prototype.objMerge = function(){
    for (var i=1; i<arguments.length; i++)
       for (var a in arguments[i])
         arguments[0][a] = arguments[i][a];
         
   return arguments[0];
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

utilities.prototype.random = function(len) {
    var rtn = '';
    var charset = 'QWERTYUIOPASDFGHJKLZCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
    
    for(i = 0;i<len;i++) {
        rtn += charset[Math.floor((Math.random() * charset.length) + 1)];
    }
    
    return rtn;
}

module.exports = new utilities;
var uti = function() {
    
    return this;
}

uti.prototype.ajax = function(action, data) {
    $.post('/' + action)
}
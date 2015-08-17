var fs = require('fs');
var glob = require('glob');
var path = require('path');
var uti = require(__methods + 'utilities').prototype;

var resources = function(dirs) {
    this.dirs   = dirs;
    this.change = false;
    
    this.fetchAssetStructure();
    
    return this;
}

resources.prototype.fetchAssetStructure = function() {
    uti.forEach(this.dirs, function(key, item) {
        glob(item.dir + '/*.' + key, function (err, files) {
            if (err)
                return uti.debug(err);
                
            if (files.length < 1)
                return uti.debug('No assets found for: ' + item);
                
            resources.prototype.filesProc(files, item.build_dir);
            uti.debug('Assets for ' + item.dir + ' found:');
            uti.debug(files);
        });
    });
}

resources.prototype.compareFiles = function(callback, opts) {
    fs.stat(opts[0], function(err, stat) {
        if (err)
            return uti.debug(err);
            
        var build = [];
        
        try {
            build = fs.statSync(opts[2]);
        } catch(err) {
            fs.closeSync(fs.openSync(opts[2], 'w'));
            build['mtime'] = 0;
            console.log('Build file: ' + opts[2] + ' not found, creating.');
        }

        if (eval("'" + stat['mtime'] + "'" + opts[1] + "'" + build['mtime'] + "'")) {
             callback(opts[2]);
        }
    });
}

resources.prototype.filesProc = function(files, build_dir) {
    try {
        fs.statSync(build_dir);
    } catch(err) {
        fs.mkdirSync(build_dir);
        console.log('Build directory: ' + build_dir + ' not found, creating.');
    }
    
    files.forEach(function(item, key) {
        var dir = build_dir + '/' + path.basename(item);
        
        resources.prototype.compareFiles(function(file) {
            uti.debug('File: ' + file + ' outdated.');
        }, [item, '>', dir]);
    });
}
module.exports = resources;
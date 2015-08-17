var res = require(__methods + 'resources');
var uti = require(__methods + 'utilities');
var sass = require('node-sass');
var compressor = require('node-minify');

var minifier = function(dirs) {
    this.dirs = dirs;
    
    new res(this.dirs, function(type, file, build, complete) {
        if (type == 'scss') {
            return sass.renderSync({
                file: file,
                outputStyle: 'compressed',
            }, function(err) {
                if (err) return uti.debug(err);
                
                complete();
            }).css.toString();
        } else if (type == 'js') {
            new compressor.minify({
                type: 'gcc',
                fileIn: file,
                fileOut: build,
                callback: function(err, min){
                    if (err) console.log(err);
                    console.log(1);
                    complete(min);
                }
            });
            
        }
    }, function(type, files, build_dir) {
        new compressor.minify({
            type: 'no-compress',
            fileIn: files,
            fileOut: build_dir + '/build.' + (type == 'scss' ? 'css' : 'js'),
            callback: function(err, min){
                if (err) uti.debug(err);
            }
        });
    });
}

minifier.prototype.init = function() {
    var test = '<div id="test"><div class="name leon"></div></div';

    /*
    for(keys in Object.keys(this.opts)) {
        
    }
    */
}

module.exports = minifier;
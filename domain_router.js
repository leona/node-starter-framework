// Source http://stackoverflow.com/questions/19254583/how-do-i-host-multiple-node-js-sites-on-the-same-ip-server-with-different-domain
var http = require('http'),
    httpProxy = require('http-proxy');

var proxy_web = new httpProxy.createProxyServer({
        target: {
            host: 'localhost',
            port: 8080
        }
    });

    var proxy_api = new httpProxy.createProxyServer({
        target: {
            host: 'localhost',
            port: 8081
        }
    });

    http.createServer(function(req, res) {
        if (req.headers.host === 'http://www.domain.com') {
            proxy_web.proxyRequest(req, res);
            proxy_web.on('error', function(err, req, res) {
                if (err) console.log(err);
                res.writeHead(500);
                res.end('Oops, something went very wrong...');
            });
        } else if (req.headers.host === 'http://api.domain.com') {
            proxy_api.proxyRequest(req, res);
            proxy_api.on('error', function(err, req, res) {
                if (err) console.log(err);
                res.writeHead(500);
                res.end('Oops, something went very wrong...');
            });
        }
    }).listen(80);
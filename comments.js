// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

var comments = [];

http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), function(err, data) {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('404 - Not Found');
                res.end();
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(data);
                res.end();
            }
        });
    } else if (pathname === '/comments') {
        if (req.method === 'GET') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(JSON.stringify(comments));
            res.end();
        } else if (req.method === 'POST') {
            var body = '';
            req.on('data', function(chunk) {
                body += chunk;
            });
            req.on('end', function() {
                var newComment = JSON.parse(body);
                comments.push(newComment);
                res.writeHead(201, {
                    'Content-Type': 'application/json'
                });
                res.write(JSON.stringify(newComment));
                res.end();
            });
        } else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.write('404 - Not Found');
            res.end();
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.write('404 - Not Found');
        res.end();
    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');
// End of comments.js
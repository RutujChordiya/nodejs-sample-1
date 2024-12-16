const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Create server
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const pathname = parsedUrl.pathname;

    if (pathname === '/' && req.method === 'GET') {
        // Serve the index.html file
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (pathname === '/greet' && req.method === 'GET') {
        // Process the form and serve the response
        const name = query.name || 'Guest';
        const color = query.color || '#ffffff';

        // Serve the greeting HTML
        const responseHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Greeting</title>
            <link rel="stylesheet" href="/styles.css">
            <style>
                body { background-color: ${color}; }
            </style>
        </head>
        <body>
            <p><h1>Hi there ${name}! </h1></p><br><br>
            <a href="/" class="back-link">Go Back</a>
        </body>
        </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(responseHtml);
    } else if (pathname === '/styles.css' && req.method === 'GET') {
        // Serve the CSS file
        fs.readFile(path.join(__dirname, 'public', 'styles.css'), (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('500 - Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(content);
        });
    } else {
        // Handle 404 - Page Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
}).listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

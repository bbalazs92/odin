const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // if (req.url === '/') {                                                  // If the URL is /
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err,     // Read index.html at the given location
    //         content) => {
    //             if(err) throw err;                                          // Throw error if there is one
    //             res.writeHead(200, { 'Content-Type': 'text/html'});         // Set status and content type
    //             res.end(content);                                           // Serve HTML page
    //     });
    // };

    // if (req.url === '/about') {                                                  
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err,     
    //         content) => {
    //             if(err) throw err;                                          
    //             res.writeHead(200, { 'Content-Type': 'text/html'});         
    //             res.end(content);                                           
    //     });
    // };

    // if (req.url === '/api/users') {                                                  
    //     const users = [                     // This data would come from a database normally
    //         { name: 'Bob Smith', age: 40},  
    //         { name: 'John Doe', age: 30}
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json'});         // Have to modify to application/json because this is not HTML content anymore
    //     res.end(JSON.stringify(users));                                    // Turns users array into JSON format
    // };

    // Build file path
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    // Extension of file
    let extensionName = path.extname(filePath);

    // Initial content type
    let contentType = 'text/html';

    // Check ext and set content type
    switch (extensionName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    };

    // Read file
    fs.readFile(filePath, (err, content) => {
        if(err) {
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html' }); 
                    res.end(content, 'utf8');
                })
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            } 
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType }); 
            res.end(content, 'utf8');
        };
    });
});

const PORT = process.env.PORT || 6060;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
const http = require('http');

// Create server object
http.createServer((req, res) => {
    // Write response
    res.write('Hello world');
    res.end();
}).listen(6001, () => console.log('Server running')); // don't use restricted ports like 6000
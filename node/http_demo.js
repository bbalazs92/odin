const http = require('http');
const os = require('os');

// Create server object
// http.createServer((req, res) => {
//     // Write response
//     res.write('Hello world');
//     res.end();
// }).listen(6001, () => console.log('Server running')); // don't use restricted ports like 6000

// Create server object
http.createServer((req, res) => {
    // Write response
    res.write(os.platform());
    res.end();
}).listen(6001, gatherInfo()); // don't use restricted ports like 6000

function gatherInfo() {
    console.log(os.platform());
    console.log(os.arch());
    console.log(os.release());
    console.log(os.userInfo());
};
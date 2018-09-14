const http = require('http');
const app = require('./app');
var debug = require('debug')('http')

const port = process.env.API_PORT || 3000;

const server = http.createServer(app);

server.listen(port, function () {
  debug('app listening on', port);
})
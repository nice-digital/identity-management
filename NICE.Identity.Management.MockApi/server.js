require('dotenv').config();
const jsonServer = require('json-server');
const fs = require('fs');
const http = require('http');
const https = require('https');

const http_port = process.env.HTTP_PORT || 3000;
const https_port = process.env.HTTPS_PORT || 3443;
const options = { cert: null, key: null };

if(fs.existsSync('localhost-cert.pem') && fs.existsSync('localhost-key.pem')) {
  options.key = fs.readFileSync('localhost-key.pem');
  options.cert = fs.readFileSync('localhost-cert.pem');
}

const server = jsonServer.create();
const router = jsonServer.router('api/db.json');
const middleware = jsonServer.defaults();
server.use(router);
server.use(middleware);

http.createServer(server).listen(http_port, () => {
  console.log(`Identity Management Mock API is running on http://localhost:${http_port}`);
});

if (options.cert && options.key){
  https.createServer(options, server).listen(https_port, () => {
    console.log(`Identity Management Mock API is running on https://localhost:${https_port}`);
  });
}

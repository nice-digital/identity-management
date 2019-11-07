require('dotenv').config();
const jsonServer = require('json-server');
const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');

const http_port = process.env.HTTP_PORT || 3001;
const https_port = process.env.HTTPS_PORT || 3443;
const options = { cert: null, key: null };

if(fs.existsSync('localhost-cert.pem') && fs.existsSync('localhost-key.pem')) {
  options.key = fs.readFileSync('localhost-key.pem');
  options.cert = fs.readFileSync('localhost-cert.pem');
}

const rewriter = jsonServer.rewriter({
  '/api/*': '/$1',
  '/users\\?sort=:field\\:1': '/users?_sort=:field&_order=asc',
  '/users\\?sort=:field\\:-1': '/users?_sort=:field&_order=desc'
});

const server = jsonServer.create();
const middleware = jsonServer.defaults();
const router = jsonServer.router('api/db.json');

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  let requestUrl = url.parse(req.url);
  if (requestUrl.path.includes('/users')){
    router.db._.id = "userId";
  }else{
    router.db._.id = "id";
  }
  next()
});
server.use(middleware);
server.use(rewriter);
server.use(router);

http.createServer(server).listen(http_port, () => {
  console.log(`Identity Management Mock API is running on http://localhost:${http_port}`);
});

if (options.cert && options.key){
  https.createServer(options, server).listen(https_port, () => {
    console.log(`Identity Management Mock API is running on https://localhost:${https_port}`);
  });
}

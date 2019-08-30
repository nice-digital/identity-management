### NICE Identity Management Mock Api

Mock API for the Identity Management application

## Requirements

- Node.js v8.x
- npm v6.x

## How to run

### Create certificates for https (optional)
 
If you want to run the mock server with https install 
[mkcert](https://github.com/FiloSottile/mkcert), 
and run the following in this directory to generate a certificate and key: 

```bash
mkcert -cert-file localhost-cert.pem -key-file localhost-key.pem localhost
```

### Change port (optional)

If you want to change the ports create a file named `.env` with the following content

```
HTTP_PORT=3000
HTTPS_PORT=3443
```

### Run the mock server

Run the following in the command line: 

```
npm start
```
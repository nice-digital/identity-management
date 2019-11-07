<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

  - [NICE Identity Management Mock Api](#nice-identity-management-mock-api)
- [Requirements](#requirements)
- [How to run](#how-to-run)
  - [Create certificates for https (optional)](#create-certificates-for-https-optional)
  - [Change port (optional)](#change-port-optional)
  - [Run the mock server](#run-the-mock-server)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
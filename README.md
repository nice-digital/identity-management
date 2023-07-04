# Identity Management
  
 > This repo contains the application role management interface to be used primarily by App Support, to manage user's role permissions. 
 > It's a replacement for the functionality that was built into NICE Accounts.
 
<details>
<summary><strong>Table of contents</strong></summary>
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
</details>

- [Secrets.json](#secretsjson)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
</details>
  
## What is it?
Overview
- This application provides App Support with the ability to assign users with roles for websites.
- The visual studio project in the repo is "NICE.Identity.Management". The UI is a react app, hosted in a child folder "ClientApp"
The NICE.Identity.Management project is responsible for proxying the requests of the UI to the API, adding authentication on the way. Also, it provides endpoints for Login and Logout.
  
## Stack
- [.NET Core 2.2](https://github.com/dotnet/core) parent application
  - [Proxy Kit](https://github.com/damianh/ProxyKit) - this proxy sends requests from the front-end to the api, adding authentication on the way.
- [React](https://reactjs.org/) front-end
    - [Jest](https://facebook.github.io/jest/) for JavaScript tests
    - [ESLint](https://eslint.org/) for JavaScript linting
  
## Set up

Install [Node.js](https://nodejs.org/en/download/)

change directory to the client app:
cd NICE.Identity.Management/ClientApp

npm install
npm start

## Running in Visual Studio

Change the dropdown next to the green play button to "NICE.Identity.Dev", you might also need to disable IIS Express.

## Further Readme files

There are other readme.md files dotted about this repo, most importantly, you will need to follow the readme file in NICE.Identity.Management/ClientApp

#### Secrets.json

The application's uses appsettings.json to store configuration. However, since this is a public repository, confidential configuration information is stored in secrets.json
In order to run the application correctly (with it having access to a database), you'll need to acquire (from another dev) or create a secrets.json file with the correct configuration information in. For more  information see: [https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio)
  
If you are creating from scratch, the key sections are:
 - WebAppConfiguration (To enable the application to talk to Auth0 and the Identity WebAPI)
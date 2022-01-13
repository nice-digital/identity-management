# Identity Management
  
 > This repo contains the application role management interface to be used primarily by App Support, to manage user's role permissions. 
 > It's a replacement for the functionality that was built into NICE Accounts.
 
<details>
<summary><strong>Table of contents</strong></summary>
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
</details>

  - [Overview](#overview)
- [Stack](#stack)
- [Set up](#set-up)
  - [Secrets.json](#secretsjson)
  - [Running the UI](#running-the-ui)
  - [Prerequisites](#prerequisites)
    - [Key Secrets.json configuration settings](#key-secretsjson-configuration-settings)
    - [React app environment variables](#react-app-environment-variables)
    - [Identity API](#identity-api)
  - [Running the app](#running-the-app)
  - [Run everything together - fastest approach](#run-everything-together---fastest-approach)
  - [Run everything individually](#run-everything-individually)
    - [Run the React app](#run-the-react-app)
    - [Run the .NET Core app](#run-the-net-core-app)
  - [Identity API Database](#identity-api-database)
  - [Common issues](#common-issues)
    - [The dreaded Unexpected token < in JSON at position 0](#the-dreaded-unexpected-token--in-json-at-position-0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
</details>
  
## What is it?

### Overview

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

### Secrets.json

The application's uses appsettings.json to store configuration. However, since this is a public repository, confidential configuration information is stored in secrets.json
In order to run the application correctly (with it having access to a database), you'll need to acquire (from another dev) or create a secrets.json file with the correct configuration information in. For more  information see: [https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio)

### Running the UI

The UI consists of the .NET Core app and the React app. The React app calls the .NET Core app which in turn calls the Identity API.

### Prerequisites

#### Key Secrets.json configuration settings

In order to run the Identity management site you have to ensure key configuration settings have the correct values inside the `WebAppConfiguration` object.

- `ApiIdentifier` - this identifies the Identity API the app will use to authenticate itself against
- `ClientId` - this needs to match the `ClientId` of the app defined in the Identity provider (Auth0) for the relevant environment
- `ClientSecret` - this needs to match the `ClientSecret` of the app defined in the Identity provider (Auth0) for the relevant environment
- `AuthorisationServiceUri`- this configuration setting is very important if you want to run against a local instance of the Identity API. Note, this is different to the `ApiIdentifier`. The `ApiIdentifier` authenticates the app when logging in. Whereas `AuthorisationServiceUri` points the Identity API to a local instance, which then authenticates against Auth0 using machine to machine tokens. Therefore, it's also important the local intance of the API has the correct values in the `secrets.json` file.

#### React app environment variables

Create a .env file in the root of the ClientApp folder and create the following variables:

```text
REACT_APP_API_BASE_URL=https://local-identityadmin.nice.org.uk:44300/api
REACT_APP_AUTH0_API_URL= this should have the value for whatever ApiIdentifier is set to
ESLINT_NO_DEV_ERRORS=true
```

You may be wondering why the Identity management site has it's own endpoint when we already have the Identity API? This is because the Identity management site uses it's own API endpoint to then proxy calls to the Identity API. See [Identity API](identity-api)

#### Identity API

The app uses the local instance of the Identity API, ensure it is up and running.

### Running the app

There are two options to run the UI:

### Run everything together - fastest approach

You can run the .NET Core app which will also start the React app.

Firstly you will need to uncomment these two lines:

1. `spa.UseReactDevelopmentServer(npmScript: "start");`
2. `spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");`

Then, you have two options:

1. Click Debug -> Start Debugging OR

2. Right click on the project `NICE.Identity.Management` and select the profile called `NICE.Identity.Dev` and then click Debug -> Start Debugging

Option 2 is advised since the app runs inside a console window which allows you to see debug information in realtime.

### Run everything individually

#### Run the React app

Change directory to the client app:

```powershell
cd NICE.Identity.Management/ClientApp

npm install

npm start
```

#### Run the .NET Core app

Run the .NET Core app using either of the two options, as described in [Run everything together - fastest approach](#run-everything-together)

### Identity API Database

When you login for the first time, you will have issues, since you need to define the correct roles in the Identity database. You can use the local instance of the Identity API to insert data into the database.

1. Ensure you import your user data into the `Users` table (you can use the Identity API or SQL, it's up to you). See [User import and export](https://nicedigital.atlassian.net/wiki/spaces/IDAM/pages/2703622343/User+import+and+export)
2. Make sure you match the `NameIdentifier` field with what is coming from the Identity provider. You can get this from the request endpoint which results in a `401 failed to set claims`, which, you will most likely see.
3. Ensure you assign your user the correct role, see the `UserRoles` table

### Common issues

#### The dreaded Unexpected token < in JSON at position 0

This usually occurs when the app can't get a status code 200 from the Identity API. Ensure you have the correct user roles defined in the Identity database.

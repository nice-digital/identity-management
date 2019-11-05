# Identity Managment
  
 > This repo contains the application role management interface to be used primarily by App Support, to manage user's role permissions. 
 > It's a replacement for the functionality that was built into NICE Accounts.
 
<details>
<summary><strong>Table of contents</strong></summary>
<!-- START doctoc -->
<!-- END doctoc -->
</details>
  
## What is it?
Overview
- This application provides App Support with the ability to assign users with roles for websites.
  
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

### Gotchas
    - List and provide solutions to possible difficulties/issues someone may encounter while setting up the development environment.
  
## How to use
> How might different users use the service
 
### What are the main user journeys?
- A journey example
- Another jorney example
- Yet another journey example
 
  
## Good to know
  
- List Hidden features eg admin specific tools
  
| Environment |  URL  |
| ----------- | :---: |
| Dev         | Link  |
| Test        | Link  |
 
# Top 5 common issues affecting users
> An explanation of the top 5 common issues (if applicable) that we as a development team might encounter with this project

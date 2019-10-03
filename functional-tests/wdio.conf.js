var path = require("path");

exports.config = {

    // Use selenium standalone server so we don't have spawn a separate server
    services: ["selenium-standalone"],
    seleniumLogs: "./logs",

    specs: [
        "./src/features/**/*.feature"
    ],
    exclude: [
        // "./src/features/**/identityHomepage.feature",
        // "./src/features/**/identityFailedLogin.feature"
    ],

    // Assume user has Chrome and Firefox installed.
    capabilities: [
        {
            browserName: "chrome",
        }
    ],

    logLevel: "verbose",
    coloredLogs: true,
    screenshotPath: "./errorShots/",
    baseUrl: "https://test-identityadmin.nice.org.uk/", //- below url is a temporary measure for time being so that we can create some automation
    //baseUrl: "https://alpha-nice-identity.eu.auth0.com/",
    reporters: ["spec"],

    // Use BDD with Cucumber
    framework: "cucumber",
    cucumberOpts: {
        compiler: ["js:babel-register"], // Babel so we can use ES6 in tests
        require: [
            "./src/steps/given.js",
            "./src/steps/when.js",
            "./src/steps/then.js"
        ],
        tagExpression: "not @pending", // See https://docs.cucumber.io/tag-expressions/
        timeout: 30000,
    },

    // Set up global asssertion libraries
    before: function before() {
        const chai = require("chai");
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const request = new XMLHttpRequest();
        var body = JSON.stringify({
            "grant_type": process.env.AUTHCONFIGURATION_API_GRANT_TYPE,
            "client_id": process.env.AUTHCONFIGURATION_API_CLIENTID,
            "client_secret": process.env.AUTHCONFIGURATION_API_CLIENTSECRECT,
            "audience": process.env.AUTHCONFIGURATION_API_AUDIENCE
        });
        request.open('POST', process.env.AUTHCONFIGURATION_API_OAUTH_TOKEN_URL, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function (e) {
            console.log(this.status);
            if (this.status == 200) {
                const auth_token = JSON.parse(this.responseText);
                process.env.access_token = auth_token.access_token
            } else {
                throw (new Error('Unable to obtain the access token. Returned a ' + this.status + ' response'));
            }
        };
        request.send(body);
    }
}
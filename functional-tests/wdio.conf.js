var path = require("path");

exports.config = {

    // Use selenium standalone server so we don't have spawn a separate server
    services: ["selenium-standalone"],
    seleniumLogs: "./logs",

    specs: [
        "./src/features/**/identityFailedLogin.feature"
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
    baseUrl: "https://alpha-identityadmin.nice.org.uk/", //- below url is a temporary measure for time being so that we can create some automation
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
    },
}
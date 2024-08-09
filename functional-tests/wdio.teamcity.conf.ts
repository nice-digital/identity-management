import { hooks } from './src/support/hooks.js';
import { XMLHttpRequest } from "xmlhttprequest";
// const isInDocker = !!process.env.IN_DOCKER,
// 	isTeamCity = !!process.env.TEAMCITY_VERSION;

export const config: WebdriverIO.Config = {
   runner: 'local',
    specs: ["./src/features/**/editUserRoles.feature"],
    capabilities: [
        {
            browserName: 'firefox',
            acceptInsecureCerts : true,
            "moz:firefoxOptions": {
              "prefs": {
          "dom.ipc.processCount": 8,
          "security.insecure_field_warning.contextual.enabled": false,
          "security.insecure_connection_text.enabled": true,
          "security.warn_submit_secure_to_insecure": false,
          "security.certerrors.permanentOverride": false,
          "network.stricttransportsecurity.preloadlist": false,
          "security.enterprise_roots.enabled": true,
          "javascript.options.showInConsole": false
        },
            // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            //args: ['-headless']
          }
        }
    ],
    // services: ['selenium-standalone'],
    logLevel: 'debug',
    baseUrl: "http://idam:8080",
    reporters: [
		"spec",
		"teamcity",
		["allure",
			{
				useCucumberStepReporter: true,
				// Turn on screenshot reporting for error shots
				disableWebdriverScreenshotsReporting: false,
			},
		],
	],

	framework: "cucumber",
	cucumberOpts: {
		require: [
			"./src/steps/**/*.ts"
		],
		tags: "not @pending", // See https://docs.cucumber.io/tag-expressions/
		timeout: 1500000,
	},

	afterStep: async function (_test: any, _scenario: { name: string; }, { error, passed }: any) {
		// Take screenshots on error, these end up in the Allure reports
		if (error) await browser.takeScreenshot();
	},
	
	before: async function before() {
        
        const request = new XMLHttpRequest();
        var body = JSON.stringify({
            "grant_type": process.env.IDENTITYAPI_API_GRANT_TYPE,
            "client_id": process.env.IDENTITYAPI_API_CLIENTID,
            "client_secret": process.env.IDENTITYAPI_API_CLIENTSECRECT,
            "audience": process.env.IDENTITYAPI_API_AUDIENCE
        });
        request.open('POST', process.env.IDENTITYAPI_API_OAUTH_TOKEN_URL, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function (e: any) {
            console.log(this.status);
            if (this.status == 200) {
                const auth_token = JSON.parse(this.responseText);
                process.env.access_token = auth_token.access_token
            } else {
                throw (new Error('Unable to obtain the access token. Returned a ' + this.status + ' response'));
            }
        };
        request.send(body);
    },

	autoCompileOpts: {
		autoCompile: true,
		// see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
		// for all available options
		tsNodeOpts: {
			transpileOnly: true,
			project: "tsconfig.json",
		},
	},
};

// wdio config for docker/teamcity

// var config = require('./wdio.conf.ts').config;

// config.services = [];

// // Run headless on TeamCity
// config.capabilities = [
//   {
//     acceptInsecureCerts: true, // Because of self-signed cert inside Docker
//     acceptSslCerts: true,
//     maxInstances: 2,
//     browserName: 'chrome',
//     chromeOptions: {
//       w3c: false,
//       args: ['--headless', '--window-size=1366,1000'],
//     },
//     'goog:chromeOptions': {
//       args: ['--disable-dev-shm-usage'],
//       localState: {
//         'browser.enabled_labs_experiments': [
//           'same-site-by-default-cookies@2',
//           'cookies-without-same-site-must-be-secure@2',
//           'mixed-forms-interstitial@2',
//         ],
//       },
//     },
//   }, //,
//   // {
//   // 	acceptInsecureCerts: true, // Because of self-signed cert inside Docker
//   // 	acceptSslCerts: true,
//   //     browserName: "firefox",
//   //     "moz:firefoxOptions": {
//   // 		args: ["-headless"]
//   //     }
//   // }
// ];

// config.reporters = ['spec', 'teamcity', 'allure'];

// exports.config = config;

import { hooks } from './src/support/hooks.js';
// const isInDocker = !!process.env.IN_DOCKER,
// 	isTeamCity = !!process.env.TEAMCITY_VERSION;

export const config: WebdriverIO.Config = {
	// Use devtools to control Chrome when we're running tests locally
	// Avoids issues with having the wrong ChromeDriver installed via selenium-standalone when Chrome updates every 6 weeks.
	// We need to use webdriver protocol in Docker because we use the selenium grid.
	automationProtocol: "webdriver",
	runner:'local',
	maxInstances: 1,
	path: "/wd/hub",

	specs: [//"./src/features/**/*.feature"
		"./src/features/**/addNewOrganisations.feature"
	],

	capabilities: [
		{
    acceptInsecureCerts: true, // Because of self-signed cert inside Docker
    // acceptSslCerts: true,
    maxInstances: 1,
    browserName: 'chrome',
    // chromeOptions: {
    //   // w3c: false,
    //   args: ['--headless', '--window-size=1366,1000'],
    // },
    'goog:chromeOptions': {
      args: ['--disable-dev-shm-usage', '--ignore-certificate-errors', '--ignore-ssl-errors=yes', '--allow-insecure-localhost', '--allow-running-insecure-content', '--disable-web-security', '--no-sandbox'],
      localState: {
        'browser.enabled_labs_experiments': [
          'same-site-by-default-cookies@2',
          'cookies-without-same-site-must-be-secure@2',
          'mixed-forms-interstitial@2'
        ],
      },
    },
  },
  // {
  // 	acceptInsecureCerts: true, // Because of self-signed cert inside Docker
  // 	acceptSslCerts: true,
  //     browserName: "firefox",
  //     "moz:firefoxOptions": {
  // 		args: ["-headless"]
  //     }
  // }
	],

	logLevel: "warn",

	baseUrl: "https://niceorg/consultations/",
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
		var fileName = "errorShots/" + "ERROR_" + _scenario.name + ".png";
		if (error) await browser.takeScreenshot();
		if (error) await browser.saveScreenshot(fileName);
	},
	
	before: async function before() {

        const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
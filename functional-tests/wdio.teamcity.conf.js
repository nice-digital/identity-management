// wdio config for docker/teamcity

var config = require('./wdio.conf.js').config;

config.services = [];

// Run headless on TeamCity
config.capabilities = [
  {
    acceptInsecureCerts: true, // Because of self-signed cert inside Docker
    acceptSslCerts: true,
    maxInstances: 2,
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--window-size=1366,1000'],
    },
    'goog:chromeOptions': {
      args: [],
      localState: {
        'browser.enabled_labs_experiments': [
          'same-site-by-default-cookies@2',
          'cookies-without-same-site-must-be-secure@2',
        ],
      },
    },
  }, //,
  // {
  // 	acceptInsecureCerts: true, // Because of self-signed cert inside Docker
  // 	acceptSslCerts: true,
  //     browserName: "firefox",
  //     "moz:firefoxOptions": {
  // 		args: ["-headless"]
  //     }
  // }
];

config.reporters = ['spec', 'teamcity'];

exports.config = config;

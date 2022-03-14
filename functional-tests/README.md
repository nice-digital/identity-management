# End to End tests for Identity Management Portal

> Functional, browser-based E2E tests for Identity Management Portal, built with WebdriverIO 7

[**:rocket: Jump straight to getting started**](#rocket-set-up)

## Table of contents

- [Table of contents](#table-of-contents)
- [Stack](#stack)
  - [Software](#software)
- [:rocket: Set up](#rocket-set-up)
  - [Install Java JDK](#install-java-jdk)
  - [Run the tests](#run-the-tests)
  - [Docker](#docker)
  - [Using npm](#using-npm)
- [Excluding tests](#excluding-tests)
- [Running single features](#running-single-features)
- [Troubleshooting](#troubleshooting)
  - [session not created: This version of ChromeDriver only supports Chrome version xx](#session-not-created-this-version-of-chromedriver-only-supports-chrome-version-xx)
  - [Port 4444 is already in use](#port-4444-is-already-in-use)

## Stack

### Software

- [VS Code IDE](https://code.visualstudio.com/)
  - With recommended extensions (VS Code will prompt you to install these automatically)
- [WebdriverIO 7](<[http://.webdriver.io/](https://webdriver.io/)>)
  - [Cucumber.js](https://github.com/cucumber/cucumber-js) for running BDD gherkin-syntax feature files
  - [wdio-cucumber-steps](https://github.com/nice-digital/wdio-cucumber-steps) for shared step definitions for Cucumber JS BDD tests in WebdriverIO
  - [Allure](https://docs.qameta.io/allure/) to generate a test report
- [Docker](https://www.docker.com/) for running the tests in TeamCity against Chrome and Firefox

## :rocket: Set up

### Install Java JDK

WebDriverIO uses selenium under the hood to run the automated browser tests. Selenium in turn uses Java so you will need the Java JDK (Java Development Kit) before you can run tests. Check the _C:\Program Files\Java_ folder and look for _jdk\*_ sub folders: this will indicate the JDK installed. In theory you can run `javac -version` on a terminal instead although it doesn't always seem to work so manually checking the folder is a safer option.

At the time of writing JDK 16 is the latest version, but that had issues with WDIO (see [troubleshooting](#troubleshooting)), so using JDK 8 (e.g. 8u301) is the best option.

If you don't have JDK 8 installed, install it from the [Oracle website](https://www.oracle.com/uk/java/technologies/javase/javase-jdk8-downloads.html). You need to register/login to download it but you might be able to find a [direct download](https://javadl.oracle.com/webapps/download/GetFile/1.8.0_301-b09/d3c52aa6bfa54d3ca74e617f18309292/windows-i586/jdk-8u301-windows-x64.exe) from [this gist](https://gist.github.com/wavezhang/ba8425f24a968ec9b2a8619d7c2d86a6) or similar to avoid needing to login.

### Run the tests

Run the tests directly on your machine via [Docker](#docker) or run them [using npm](#using-npm).

### Docker

We run the tests in Docker on TeamCity because it allows us to spin up a self-contained application, and selenium grid with both Chrome and Firefox. You can run this same stack locally inside Docker.

It can be harder to debug tests running inside Docker as you can't watch the tests run in the browser, but we do save error screenshots and logs into the docker-output folder for debugging.

1. Install [Volta](https://volta.sh/) to use the version of Node specified in package.json. Or install Node LTS if you're not using Volta.
2. Build the [Identity Management Portal](../NICE.Identity.Management/):
   1. `cd NICE.Identity.Management && dotnet publish -c Release -o published-app /property:PublishWithAspNetCoreTargetManifest="false"`
3. Install Docker
4. Open bash and `cd` into the _functional-tests_ folder
5. Run `docker-compose build`
   1. This downloads all the required images from Docker
   2. So it takes a while but it will cache everything so will be quicker next time
6. Run `./docker-run.sh`
   1. This builds the docker network, runs the tests and copies outputs in the _docker-output_ folder.

> View the [docker-compose.yml](docker-compose.yml) file to understand the structure of the Docker network and the links between containers.

### Using npm

The Docker instructions above use npm under the hood to run the tests. Run the npm commands via the command line if you prefer.

Follow the instructions from the [Docker](#docker) section above, but instead of running the `./docker-run.sh`, run `./docker-dev.sh` from the _functional-tests_ folder.

This will set up the docker environment but exec out inside the test container so that you can run the tests whenever you like by running `npm run wait-then-test`. This allows us to edit or add new tests and run them at our pleasure. You can control the the tests you would like to run from the [wdio.conf.ts](wdio.conf.ts) file by updating the _specs_ object in the json.

We can also run them outside of the docker container by detaching from it by pressing `Ctrl + d`. Once you appear on the command line you can run `npm run test:locally`. This will run the tests against the docker environment that is running but you will be able to view it running on your local browser. This is useful for watching and debugging the test runs to diagnose any failing tests.

#### Different URLs

Use the `-b` (or `--baseUrl`) [CLI parameter](https://webdriver.io/docs/clioptions/) from WebdriverIO to override the URL for the tests.

For example, to run against the test environment:

```sh
npm test -- -b https://test.nice.org.uk/
```

## Excluding tests

Exclude tests by using the `@pending` [cucumber tag](https://github.com/cucumber/cucumber/wiki/Tags).

## Running single features

To run a single feature file, use the following command:

```sh
npm test -- --spec ./features/guidance-list.feature
```

> Note: you can pass in multiple files, separated by a comma.

Or you can use a keyword to filter e.g.:

```sh
npm test -- --spec homepage
```

Note: this can be combined with other options, for example to run _just_ the search page tests against the live website, run:

```sh
npm test -- --spec search --baseUrl http://www.nice.org.uk
```

Finally, if you've grouped your specs into suites you can run and individual suite with:

```sh
npm test -- --suite homepage
```

See [organizing test suites](https://webdriver.io/docs/organizingsuites/) in the WebdriverIO docs for more info.

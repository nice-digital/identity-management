import setInputField from "@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField";
import waitFor from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitFor";

export const Login = (username, password) => {
  browser.waitForVisible("body .auth0-lock-input[name='email']", 10000);
  browser.waitForVisible("body .auth0-lock-input[name='password']", 10000);
  browser.setValue(".auth0-lock-input[name='email']", process.env[username]);
  browser.setValue(".auth0-lock-input[name='password']", process.env[password]);
  browser.submitForm(".auth0-lock-input[name='email']");
}
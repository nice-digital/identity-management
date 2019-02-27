import setInputField from "@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField";
import waitFor from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitFor";
import selectors from "../selectors";
import emailInput from "../check/emailInput";

export const Login = (username, password) => {
  browser.waitForVisible(selectors.loginPage.userNameInput, 10000);
  browser.waitForVisible(selectors.loginPage.passwordInput, 10000);
  browser.setValue(selectors.loginPage.userNameInput, process.env[username]);
  browser.setValue(selectors.loginPage.passwordInput, process.env[password]);
  browser.submitForm(selectors.loginPage.signInButton);
}

export default Login;


// export const Login = (username, password) => {
//   browser.waitForVisible("body .auth0-lock-input[name='email']", 10000);
//   browser.waitForVisible("body .auth0-lock-input[name='password']", 10000);
//   browser.setValue(".auth0-lock-input[name='email']", process.env[username]);
//   browser.setValue(".auth0-lock-input[name='password']", process.env[password]);
//   browser.submitForm(".auth0-lock-input[name='email']");
// }


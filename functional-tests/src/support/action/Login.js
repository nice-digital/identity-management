import setInputField from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import click from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import waitFor from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitFor';
import scroll from '@nice-digital/wdio-cucumber-steps/lib/support/action/scroll';
import selectors from '../selectors';
import emailInput from '../check/emailInput';

export const Login = (username, password) => {
  waitForVisible(selectors.loginPage.usernameField);
  waitForVisible(selectors.loginPage.passwordField);
  browser.setValue(selectors.loginPage.usernameField, process.env[username]);
  browser.setValue(selectors.loginPage.passwordField, process.env[password]);
  // waitFor(selectors.loginPage.signInButton, 'enabled')
  scroll(selectors.loginPage.signInButton);
  click('click', 'element', selectors.loginPage.signInButton);
  browser.pause(1000);
};

export default Login;

// export const Login = (username, password) => {
//   browser.waitForVisible("body .auth0-lock-input[name='email']", 10000);
//   browser.waitForVisible("body .auth0-lock-input[name='password']", 10000);
//   browser.setValue(".auth0-lock-input[name='email']", process.env[username]);
//   browser.setValue(".auth0-lock-input[name='password']", process.env[password]);
//   browser.submitForm(".auth0-lock-input[name='email']");
// }

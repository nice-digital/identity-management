import setInputField from "../action/setInputField.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import pause from "../action/pause.js";
import selectors from '../selectors.js';

export async function Login(username: string, password: string): Promise<void> {
  await waitForDisplayed(selectors.loginPage.usernameField, "");
  await waitForDisplayed(selectors.loginPage.passwordField, "");
  await clickElement('click', 'selector', 'body #ccc-recommended-settings');
  await setInputField("set", process.env[username]!, selectors.loginPage.usernameField);
  await setInputField("set", process.env[password]!, selectors.loginPage.passwordField);
  await clickElement('click', 'selector', selectors.loginPage.signInButton);
  await pause("1000");
};

export default Login;

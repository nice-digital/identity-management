import {setInputField} from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {waitFor} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitFor';
import {pause} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pause';
import selectors from '../selectors';
// import scroll from '@nice-digital/wdio-cucumber-steps/lib/support/action/scroll';
// import emailInput from '../check/emailInput';

export async function Login(username: string, password: string): Promise<void> {
  await waitForDisplayed(selectors.loginPage.usernameField, "");
  await waitForDisplayed(selectors.loginPage.passwordField, "");
  await clickElement('click', 'selector', 'body #ccc-recommended-settings');
  // click('click', 'element', '.CoronaMessage_button__2a9qf');
  await setInputField("set", process.env[username], selectors.loginPage.usernameField);
  await setInputField("set", process.env[password], selectors.loginPage.passwordField);
  // waitFor(selectors.loginPage.signInButton, 'enabled')
  // scroll(selectors.loginPage.signInButton);
  await clickElement('click', 'selector', selectors.loginPage.signInButton);
  await pause("1000");
};

export default Login;

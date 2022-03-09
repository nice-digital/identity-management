import {setInputField} from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {waitFor} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitFor';
import {checkEqualsText} from '@nice-digital/wdio-cucumber-steps/lib/support/check/checkEqualsText';
import {pause} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pause';
import selectors from '../selectors';

export async function createaccount(username: string, password: string): Promise<void> {
  await waitForDisplayed(selectors.registrationPage.emailInput, "");
  await waitForDisplayed(selectors.registrationPage.passwordInput, "");
  await waitFor(selectors.registrationPage.tcCheckBox, "10000", "", "exist");
  await clickElement('click', 'element', selectors.registrationPage.tcCheckBox);
  await setInputField("set", process.env[username], selectors.registrationPage.emailInput);
  // browser.setValue(selectors.registrationPage.confirmEmailInput, process.env[username]);
  await setInputField("set", process.env[password], selectors.registrationPage.passwordInput);
  await setInputField("set", process.env[password], selectors.registrationPage.confirmPasswordInput);
  await setInputField("set", 'Martin', selectors.registrationPage.firstNameInput);
  await setInputField("set", 'Gallagher', selectors.registrationPage.surnameInput);
  await clickElement('click', 'element', selectors.registrationPage.registerButton);
  await pause("10000");
};

export default createaccount;

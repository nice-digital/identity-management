import setInputField from "../action/setInputField.js";
import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import waitFor from "../action/waitFor.js";
import pause from "../action/pause.js";
import selectors from '../selectors.js';

export async function createaccount(username: string, password: string): Promise<void> {
  await waitForDisplayed(selectors.registrationPage.emailInput, "");
  await waitForDisplayed(selectors.registrationPage.passwordInput, "");
  await waitFor(selectors.registrationPage.tcCheckBox, "10000", true, "exist");
  await clickElement('click', 'selector', selectors.registrationPage.tcCheckBox);
  await setInputField("set", process.env[username]!, selectors.registrationPage.emailInput);
  // browser.setValue(selectors.registrationPage.confirmEmailInput, process.env[username]);
  await setInputField("set", process.env[password]!, selectors.registrationPage.passwordInput);
  await setInputField("set", process.env[password]!, selectors.registrationPage.confirmPasswordInput);
  await setInputField("set", 'Martin', selectors.registrationPage.firstNameInput);
  await setInputField("set", 'Gallagher', selectors.registrationPage.surnameInput);
  await clickElement('click', 'selector', selectors.registrationPage.registerButton);
  await pause("10000");
};

export default createaccount;

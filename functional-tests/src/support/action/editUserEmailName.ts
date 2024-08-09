import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import pressButton from "../action/pressButton.js";
import setInputField from "../action/setInputField.js";
import selectors from '../selectors.js';
// import {debug} from "@nice-digital/wdio-cucumber-steps/lib/support/action/debug";

export async function editUserEmailName(email: string, firstname: string, lastname: string): Promise<void> {
  await waitForDisplayed(selectors.editUserProfile.EmailAddress, "");
  await clickElement('click', 'selector', selectors.editUserProfile.EmailAddress);
  await browser.keys(['Control', 'a', 'Delete']);
  await setInputField('set', process.env[email]!, selectors.editUserProfile.EmailAddress);
  await waitForDisplayed(selectors.editUserProfile.FirstName, "");
  await clickElement('click', 'selector', selectors.editUserProfile.FirstName);
  await browser.keys(['Control', 'a', 'Delete']);
  await setInputField('set', process.env[firstname]!, selectors.editUserProfile.FirstName);
  await waitForDisplayed(selectors.editUserProfile.LastName, "");
  await clickElement('click', 'selector', selectors.editUserProfile.LastName);
  await browser.keys(['Control', 'a', 'Delete']);
  await setInputField('set', process.env[lastname]!, selectors.editUserProfile.LastName);
};

export default editUserEmailName;

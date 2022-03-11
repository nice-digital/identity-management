import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {pressButton} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import {setInputField} from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';
// import {debug} from "@nice-digital/wdio-cucumber-steps/lib/support/action/debug";

export async function editUserEmailName(email: string, firstname: string, lastname: string): Promise<void> {
  await waitForDisplayed(selectors.editUserProfile.EmailAddress, "");
  await clickElement('click', 'selector', selectors.editUserProfile.EmailAddress);
  await browser.keys(['Control', 'a', 'Delete']);
  await setInputField('set', process.env[email], selectors.editUserProfile.EmailAddress);
  await waitForDisplayed(selectors.editUserProfile.FirstName, "");
  await clickElement('click', 'selector', selectors.editUserProfile.FirstName);
  await browser.keys(['Control', 'a', 'Delete']);
  await setInputField('set', process.env[firstname], selectors.editUserProfile.FirstName);
  await waitForDisplayed(selectors.editUserProfile.LastName, "");
  await clickElement('click', 'selector', selectors.editUserProfile.LastName);
  await browser.keys(['Control', 'a', 'Delete']);
  await setInputField('set', process.env[lastname], selectors.editUserProfile.LastName);
};

export default editUserEmailName;

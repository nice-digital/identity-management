import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {pressButton} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pressButton';
import {setInputField} from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';

export async function editUserEmailName(email: string, firstname: string, lastname: string): Promise<void> {
  await waitForDisplayed(selectors.editUserProfile.EmailAddress, "");
  await clickElement('click', 'selector', selectors.editUserProfile.EmailAddress);
  await pressButton("['CTRL', 'A', 'Delete']");
  await setInputField('set', process.env[email], selectors.editUserProfile.EmailAddress);
  await waitForDisplayed(selectors.editUserProfile.FirstName, "");
  await clickElement('click', 'selector', selectors.editUserProfile.FirstName);
  await pressButton("['CTRL', 'A', 'Delete']");
  await setInputField('set', process.env[firstname], selectors.editUserProfile.FirstName);
  await waitForDisplayed(selectors.editUserProfile.LastName, "");
  await clickElement('click', 'selector', selectors.editUserProfile.LastName);
  await pressButton("['CTRL', 'A', 'Delete']");
  await setInputField('set', process.env[lastname], selectors.editUserProfile.LastName);
};

export default editUserEmailName;

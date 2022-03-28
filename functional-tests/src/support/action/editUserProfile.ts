import {clickElement} from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import selectors from '../selectors';


export async function editUserProfile(): Promise<void> {
  await waitForDisplayed(selectors.UserProfile.editButton, "");
  await clickElement('click', 'selector', selectors.UserProfile.editButton);
};

export default editUserProfile;
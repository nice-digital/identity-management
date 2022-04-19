import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import { clickElement } from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';


export async function saveUserEditButton(): Promise<void> {
  
  await waitForDisplayed(selectors.editUserProfile.saveProfileButton, "");
  await clickElement("click", "selector", selectors.editUserProfile.saveProfileButton);
  
};

export default saveUserEditButton;




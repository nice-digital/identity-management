import {waitForDisplayed} from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import { clickElement } from '@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement';
import selectors from '../selectors';


export async function editAudienceInsight(): Promise<void> {

  await waitForDisplayed(selectors.editUserProfile.optIn, "");
  await clickElement("click", "selector", selectors.editUserProfile.optIn);
 
};

export default editAudienceInsight;


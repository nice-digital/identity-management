import { waitForDisplayed } from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed';
import {checkContainsText} from '@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText';
import {pause} from '@nice-digital/wdio-cucumber-steps/lib/support/action/pause';
import selectors from '../selectors';


export async function checkNewOrgOnList(): Promise<void> {

  waitForDisplayed(selectors.UserProfile.updatedUserName, "");
  checkContainsText("element", selectors.UserProfile.updatedUserName, "", 'Barry Bahamas');
	pause("1000");
  
  waitForDisplayed(selectors.UserProfile.updatedEmailAddress, "");
  checkContainsText("element", selectors.UserProfile.updatedEmailAddress, "", 'donaldbahamas@vilennin.com');
	pause("1000");

  waitForDisplayed(selectors.UserProfile.updatedAudienceInsight, "");
  checkContainsText("element", selectors.UserProfile.updatedAudienceInsight, "", 'Yes');
  pause("1000");

};

export default checkNewOrgOnList;

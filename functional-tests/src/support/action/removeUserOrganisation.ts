import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import selectors from '../selectors';


export async function removeUserOrganisation(text: string): Promise<void> {
    await waitForDisplayed(selectors.manageOrgPage.removeUser, "");
    await clickElement("click", "selector", selectors.manageOrgPage.removeUser, text);
  };
  
  
  export default removeUserOrganisation;
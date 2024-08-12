import waitForDisplayed from "../action/waitForDisplayed.js";
import clickElement from "../action/clickElement.js";
import selectors from '../selectors.js';


export async function removeUserOrganisation(text: string): Promise<void> {
    await waitForDisplayed(selectors.manageOrgPage.removeUser, "");
    await clickElement("click", "selector", selectors.manageOrgPage.removeUser); /*I have removed a 4th param here "text" and might need readding*/ 
  };
  
  
  export default removeUserOrganisation;
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export async function registerLink(): Promise<void> {    
    await waitForDisplayed(selectors.loginPage.registerLink, "");
    await clickElement('click', 'selector', selectors.loginPage.registerLink);
 };
 
export default registerLink;

import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";

export async function registerLink(): Promise<void> {    
    waitForDisplayed(selectors.loginPage.registerLink, "");
    clickElement('click', 'selector', selectors.loginPage.registerLink);
 };
 
export default registerLink;

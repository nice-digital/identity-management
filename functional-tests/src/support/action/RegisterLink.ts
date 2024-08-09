import waitForDisplayed from '../action/waitForDisplayed.js';
import clickElement from '../action/clickElement.js';
import selectors from "../selectors.js";

export async function registerLink(): Promise<void> {    
    await waitForDisplayed(selectors.loginPage.registerLink, "");
    await clickElement('click', 'selector', selectors.loginPage.registerLink);
 };
 
export default registerLink;

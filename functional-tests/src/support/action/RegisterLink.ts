import checkContainsAnyText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsAnyText";
import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import isExisting from "@nice-digital/wdio-cucumber-steps/lib/support/check/isExisting";
import clickElement from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import selectors from "../selectors";



export const registerLink = () => {    
    waitForVisible(selectors.loginPage.registerLink);
    clickElement('click', 'element', selectors.loginPage.registerLink);
 };
 
export default registerLink;

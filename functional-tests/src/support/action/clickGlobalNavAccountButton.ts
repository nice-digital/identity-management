import {setInputField} from "@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import {waitFor} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitFor";
import {checkEqualsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkEqualsText";
import selectors from "../selectors";

export async function clickGlobalNavAccountButton(): Promise<void> {
  clickElement('click', 'selector', selectors.userListPage.globalNavMyAccount);
  await browser.pause(1000);
  clickElement('click', 'selector', selectors.userListPage.globalNavSignOut);
}

export default clickGlobalNavAccountButton; 
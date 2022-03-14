import {setInputField} from "@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import {clickElement} from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import {waitFor} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitFor";
import {checkEqualsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkEqualsText";
import selectors from "../selectors";

export async function clickRegisterUncompleted(): Promise<void> {
  await clickElement('click', 'element', selectors.registrationPage.registerButton);
  await browser.pause(3000);
}

export default clickRegisterUncompleted; 
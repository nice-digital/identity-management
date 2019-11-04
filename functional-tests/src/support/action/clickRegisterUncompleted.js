import setInputField from "@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import click from "@nice-digital/wdio-cucumber-steps/lib/support/action/clickElement";
import waitFor from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitFor";
import checkEqualsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkEqualsText";
import selectors from "../selectors";

export const clickRegisterUncompleted = () => {
  click('click', 'element', selectors.registrationPage.registerButton);
  browser.pause(10000);
}

export default clickRegisterUncompleted; 
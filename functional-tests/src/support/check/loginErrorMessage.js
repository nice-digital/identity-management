import checkContainsAnyText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsAnyText";
import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible";
import selectors from "../selectors";

export const loginErrorMessage = () => {
  waitForVisible(selectors.loginPage.wrongEmailPasswordMessage);
  checkContainsAnyText('element', selectors.loginPage.wrongEmailPasswordMessage);
}

export default loginErrorMessage;
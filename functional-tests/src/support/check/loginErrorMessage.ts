import {checkContainsAnyText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsAnyText";
import {checkContainsText} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import {waitForDisplayed} from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForDisplayed";
import selectors from "../selectors";

export async function loginErrorMessage(): Promise<void> {
  await waitForDisplayed(selectors.loginPage.wrongEmailPasswordMessage, "");
  await checkContainsAnyText('element', selectors.loginPage.wrongEmailPasswordMessage);
}

export default loginErrorMessage;
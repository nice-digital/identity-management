import checkContainsAnyText from '../check/checkContainsAnyText.js';
import waitForDisplayed from '../action/waitForDisplayed.js';
import selectors from "../selectors";

export async function loginErrorMessage(): Promise<void> {
  await waitForDisplayed(selectors.loginPage.wrongEmailPasswordMessage, "");
  await checkContainsAnyText('element', selectors.loginPage.wrongEmailPasswordMessage);
}

export default loginErrorMessage;
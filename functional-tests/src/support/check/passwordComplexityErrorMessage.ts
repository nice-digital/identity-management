import checkContainsAnyText from './checkContainsAnyText.js';
import checkContainsText from './checkContainsText.js';
import waitForDisplayed from '../action/waitForDisplayed.js';
import selectors from "../selectors.js";

export async function passwordComplexityErrorMessage(): Promise<void> {
  await waitForDisplayed(selectors.loginPage.wrongEmailPasswordMessage, "");
  await checkContainsAnyText('element', selectors.loginPage.wrongEmailPasswordMessage);
  await checkContainsText('element', selectors.loginPage.wrongEmailPasswordMessage, '', 'Our password policy has been updated. You will need to provide a password that is at least 14 characters in length and contains at least 3 of the following 4 types of characters: lower case letters (a-z), upper case letters (A-Z), numbers (i.e. 0-9) and special characters (e.g. !@#$%^&*).');
}

export default passwordComplexityErrorMessage;
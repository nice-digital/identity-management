import waitForDisplayed from '../action/waitForDisplayed';
import checkContainsText from './checkContainsText.js';
import pause from '../action/pause.js';
import setInputField from '../action/setInputField.js';
import selectors from '../selectors';

export async function validateDeletionSuccessMessage(message: string): Promise<void> {
  await pause("1000");
  await waitForDisplayed(selectors.deletionAlertPage.deletionSuccessMessage, "");
  await checkContainsText(
    'element',
    selectors.deletionAlertPage.deletionSuccessMessage,
    "",
    message
  );
  await pause("1000");
};

export async function validateRegistrationValidationMessages(): Promise<void> {
  await pause("1000");
  await checkContainsText(
    'element',
    selectors.registrationPage.emailValidationMessage,
    "",
    'This field is required'
  );
  await checkContainsText(
    'element',
    selectors.registrationPage.passwordValidationMessage,
    "",
    'This field is required'
  );
  await checkContainsText(
    'element',
    selectors.registrationPage.confirmPasswordValidationMessage,
    "",
    'This field is required'
  );
  await checkContainsText(
    'element',
    selectors.registrationPage.firstNameValidationMessage,
    "",
    'This field is required'
  );
  await checkContainsText(
    'element',
    selectors.registrationPage.lastNameValidationMessage,
    "",
    'This field is required'
  );
  await setInputField('set', '123abc', selectors.registrationPage.emailInput);
  await setInputField('set', '123abc', selectors.registrationPage.passwordInput);
  await setInputField(
    'set',
    '123abc',
    selectors.registrationPage.confirmPasswordInput
  );
  await checkContainsText(
    'element',
    selectors.registrationPage.emailValidationMessage,
    "",
    'Email address is in an invalid format'
  );
  await checkContainsText(
    'element',
    selectors.registrationPage.passwordValidationMessage,
    "",
    'Please provide a password with least 8 characters in length, contain at least 3 of the following 4 types of characters: lower case letters (a-z), upper case letters (A-Z), numbers (i.e. 0-9) and special characters (e.g. !@#$%^&*)'
  );
};

export default validateDeletionSuccessMessage;

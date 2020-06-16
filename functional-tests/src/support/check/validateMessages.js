import waitForVisible from '@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible';
import checkContainsText from '@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText';
import isEnabled from '@nice-digital/wdio-cucumber-steps/lib/support/check/isEnabled';
import pause from '@nice-digital/wdio-cucumber-steps/lib/support/action/pause';
import setInputField from '@nice-digital/wdio-cucumber-steps/lib/support/action/setInputField';
import selectors from '../selectors';

export const validateDeletionSuccessMessage = (message) => {
  pause(1000);
  waitForVisible(selectors.deletionAlertPage.deletionSuccessMessage);
  checkContainsText(
    'element',
    selectors.deletionAlertPage.deletionSuccessMessage,
    message
  );
  pause(1000);
};

export const validateRegistrationValidationMessages = () => {
  pause(1000);
  checkContainsText(
    'element',
    selectors.registrationPage.emailValidationMessage,
    'This field is required'
  );
  // checkContainsText("element", selectors.registrationPage.confirmEmailValidationMessage, "This field is required");
  checkContainsText(
    'element',
    selectors.registrationPage.passwordValidationMessage,
    'This field is required'
  );
  checkContainsText(
    'element',
    selectors.registrationPage.confirmPasswordValidationMessage,
    'This field is required'
  );
  checkContainsText(
    'element',
    selectors.registrationPage.firstNameValidationMessage,
    'This field is required'
  );
  checkContainsText(
    'element',
    selectors.registrationPage.lastNameValidationMessage,
    'This field is required'
  );
  setInputField('set', '123abc', selectors.registrationPage.emailInput);
  // setInputField("set", "123abc", selectors.registrationPage.confirmEmailInput);
  checkContainsText(
    'element',
    selectors.registrationPage.emailValidationMessage,
    'Email address is in an invalid format'
  );
  setInputField('set', '123abc', selectors.registrationPage.passwordInput);
  setInputField(
    'set',
    '123abc',
    selectors.registrationPage.confirmPasswordInput
  );
  checkContainsText(
    'element',
    selectors.registrationPage.passwordValidationMessage,
    'Please provide a password with least 8 characters in length, contain at least 3 of the following 4 types of characters: lower case letters (a-z), upper case letters (A-Z), numbers (i.e. 0-9) and special characters (e.g. !@#$%^&*)'
  );
};

export default validateDeletionSuccessMessage;

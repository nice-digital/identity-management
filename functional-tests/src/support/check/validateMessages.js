import waitForVisible from "@nice-digital/wdio-cucumber-steps/lib/support/action/waitForVisible"
import checkContainsText from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkContainsText";
import isEnabled from "@nice-digital/wdio-cucumber-steps/lib/support/check/isEnabled";
import pause from "@nice-digital/wdio-cucumber-steps/lib/support/action/pause";
import selectors from "../selectors";

export const validateDeletionSuccessMessage = (message) => {
  pause(1000);
  waitForVisible(selectors.deletionAlertPage.deletionSuccessMessage);
  checkContainsText("element", selectors.deletionAlertPage.deletionSuccessMessage, message);
  pause(1000);
};

export const validateRegistrationValidationMessages = () => {
  pause(1000);
  checkContainsText("element", selectors.registrationPage.emailValidationMessage, "This field is required");
  checkContainsText("element", selectors.registrationPage.confirmEmailValidationMessage, "Email address doesn't match");
  checkContainsText("element", selectors.registrationPage.passwordValidationMessage, "This field is required");
  checkContainsText("element", selectors.registrationPage.confirmPasswordValidationMessage, "Password doesn't match");
  checkContainsText("element", selectors.registrationPage.firstNameValidationMessage, "This field is required");
  checkContainsText("element", selectors.registrationPage.lastNameValidationMessage, "This field is required");
}

export default validateDeletionSuccessMessage;


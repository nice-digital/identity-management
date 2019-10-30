import "@nice-digital/wdio-cucumber-steps/lib/then";
import loginErrorMessage from "../support/check/loginErrorMessage";
import { Then } from "cucumber";
import userNameInput from "../support/check/userNameInput";
import passwordInput from "../support/check/passwordInput";
import confirmEmailInput from "../support/check/confirmEmailInput";
import confirmPasswordInput from "../support/check/confirmPasswordInput";
import signUpUserNameInput from "../support/check/signUpUserNameInput";
import signUpSurnameInput from "../support/check/signUpSurnameInput";
import emailInput from "../support/check/emailInput";
import identityAdminHomepage from "../support/check/identityAdminHomepage";
import createaccount from "../support/action/createaccount";
import finduser from "../support/action/finduser";
import deleteUser from "../support/action/deleteUser";
import findUserList, { userNotInList } from "../support/check/findUserInList";
import validateDeletionSuccessMessage, { validateRegistrationValidationMessages } from "../support/check/validateMessages";

Then(
  /^I expect the error message is displayed$/,
  loginErrorMessage
);

Then(
  /^I expect that username input field does( not)* exist$/,
  userNameInput
);

Then(
  /^I expect that password input field does( not)* exist$/,
  passwordInput
);

Then(
  /^I expect that email input field does( not)* exist$/,
  emailInput
);

Then(
  /^I expect that confirm email input field does( not)* exist$/,
  confirmEmailInput
);

Then(
  /^I expect that confirm password input field does( not)* exist$/,
  confirmPasswordInput
);

Then(
  /^I expect that name input field does( not)* exist$/,
  signUpUserNameInput
);

Then(
  /^I expect that surname input field does( not)* exist$/,
  signUpSurnameInput
);

Then(
  /^I expect I appear on the Identity Admin homepage$/,
  identityAdminHomepage
);

Then(
  /^I can successfuly register with username "([A-Z0-9_]+)" and password "([A-Z0-9_]+)"$/,
  createaccount
);

Then(
  /^An account exists in "([A-Z0-9_]+)" with the username "([A-Z0-9_]+)"$/,
  finduser
);

Then(
  /^I delete the user "([A-Z0-9_]+)" from "([A-Z0-9_]+)"$/,
  deleteUser
);

Then(
  /^I expect user "([^"]*)" to exist in the list$/,
  findUserList
);

Then(
  /^I expect user "([^"]*)" does not exist in the list$/,
  userNotInList
);

Then(
  /^I expect the deletion successful message "([^"]*)" to be displayed$/,
  validateDeletionSuccessMessage
);

Then(
  /^I expect the registration page validation messages are displayed$/,
  validateRegistrationValidationMessages
)
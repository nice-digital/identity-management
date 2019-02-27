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

Then(
  /^I expect the error message is "([^"]*)"$/,
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
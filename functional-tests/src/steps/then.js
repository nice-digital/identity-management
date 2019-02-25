import "@nice-digital/wdio-cucumber-steps/lib/then";
import loginErrorMessage from "../support/check/loginErrorMessage";
import { Then } from "cucumber";
import userNameInput from "../support/check/userNameInput";
import passwordInput from "../support/check/passwordInput";

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
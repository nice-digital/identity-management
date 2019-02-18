import "@nice-digital/wdio-cucumber-steps/lib/then";
import loginErrorMessage from "../support/check/loginErrorMessage";
import { Then } from "cucumber";

Then(
  /^I expect the error message is "([^"]*)"$/,
  loginErrorMessage
);
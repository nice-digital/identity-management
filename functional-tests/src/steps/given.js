import "@nice-digital/wdio-cucumber-steps/lib/given";
import { Given } from "cucumber";
import navigateToRegPage from "../support/action/navigateToRegPage";

Given(
    /^I navigate to the registration page$/,
    navigateToRegPage
);
import "@nice-digital/wdio-cucumber-steps/lib/given";
import { Given } from "cucumber";
import navigateToRegPage from "../support/action/navigateToRegPage";
import navigateToUserListPage from "../support/action/navigateToUserListPage";

Given(
    /^I navigate to the registration page$/,
    navigateToRegPage
);

Given(
    /^I navigate to the user list page$/,
    navigateToUserListPage
);
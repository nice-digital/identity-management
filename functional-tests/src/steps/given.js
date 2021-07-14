import "@nice-digital/wdio-cucumber-steps/lib/given";
import { Given } from "cucumber";
import navigateToRegPage from "../support/action/navigateToRegPage";
import {navigateToUserListPageUsingBreadscrumb, navigateToUserListPageFromAdminPage} from "../support/action/navigateToUserListPage";

Given(
    /^I navigate to the registration page$/,
    navigateToRegPage
);

Given(
    /^I navigate to the user list page$/,
    navigateToUserListPageUsingBreadscrumb
);

Given(
    /^I click on the manage user button$/,
    navigateToUserListPageFromAdminPage
);
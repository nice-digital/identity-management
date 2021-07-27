import "@nice-digital/wdio-cucumber-steps/lib/given";
import { Given } from "cucumber";
import navigateToRegPage from "../support/action/navigateToRegPage";
import {navigateToUserListPageUsingBreadscrumb, navigateToUserListPageFromAdminPage} from "../support/action/navigateToUserListPage";
import {navigateToServiceListPageUsingBreadscrumb, navigateToServiceListPageFromAdminPage} from "../support/action/navigateToServicesListPage";

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
//Given(
 //   /^I navigate to the manage services list page$/,
 //   navigateToServiceListPageUsingBreadscrumb
//);
Given(
    /^I click on the manage services button$/,
    navigateToServiceListPageFromAdminPage
);
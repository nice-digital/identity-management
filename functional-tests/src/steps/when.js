import "@nice-digital/wdio-cucumber-steps/lib/when";
import { Login } from "../support/action/Login";
import { When } from "cucumber";
import registerLink from "../support/action/RegisterLink";
import findUserList, { clickUserInList } from "../support/check/findUserInList";

When(
  /^I log into accounts with username "([A-Z0-9_]+)" and password "([A-Z0-9_]+)"$/,
  Login
);

// When(
//   /^I (click|double) on the Register link$/,
//   registerLink
// );

When(/^I click on the Sign up link$/,
 registerLink
);

When(
  /^I click on the first user in the list$/,
  clickUserInList
);

When(
  /^I click on the delete user link$/,
  clickDeleteUserLink
);
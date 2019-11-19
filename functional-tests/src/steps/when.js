import "@nice-digital/wdio-cucumber-steps/lib/when";
import { Login } from "../support/action/Login";
import { When } from "cucumber";
import registerLink from "../support/action/RegisterLink";
import findUserList, { clickFirstUserInList, clickSecondUserInList } from "../support/check/findUserInList";
import clickDeleteUserLink, { clickConfirmDelete, clickBackToUsersLink } from "../support/action/clickDeleteUserLink";
import clickRegisterUncompleted from "../support/action/clickRegisterUncompleted";
import clickGlobalNavAccountButton from "../support/action/clickGlobalNavAccountButton";
import clickLockUserButton from "../support/action/clickLockUserButton";

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
  clickFirstUserInList
);

When(
  /^I click on the second user in the list$/,
  clickSecondUserInList
);

When(
  /^I click on the delete user link$/,
  clickDeleteUserLink
);

When(
  /^I click on the confirm delete button$/,
  clickConfirmDelete
);

When(/^I click on the back to users link$/,
  clickBackToUsersLink
);

When(/^I click the register button without completing any details$/,
  clickRegisterUncompleted
);

When(/^I click on the GlobalNav accounts button$/,
  clickGlobalNavAccountButton
  );

When(
  /^I click on the Lock user button$/,
  clickLockUserButton
);

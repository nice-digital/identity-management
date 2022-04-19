import "@nice-digital/wdio-cucumber-steps/lib/when";
import { Login } from "../support/action/Login";
import { When } from "@cucumber/cucumber";
import registerLink from "../support/action/RegisterLink";
import findUserList, { clickFirstUserInList, clickSecondUserInList, clickLastUserInList } from "../support/check/findUserInList";
import clickDeleteUserLink, { clickConfirmDelete, clickBackToUsersLink } from "../support/action/clickDeleteUserLink";
import clickRegisterUncompleted from "../support/action/clickRegisterUncompleted";
import clickGlobalNavAccountButton from "../support/action/clickGlobalNavAccountButton";
import clickLockUserButton, { clickAddRoleButton } from "../support/action/clickLockUserButton";
import clickIdamDockerService, { clickTestEnvironment, clickFirstRole, clickSecondRole, clickThirdRole, clickFourthRole, clickSave, clickFirstService } from "../support/action/selectService";
import validateServiceEnvFilterChecked, { enterNameToFilter, clickCancelFilter } from "../support/check/validateFilterChecked";
import deleteEnteredText from "../support/check/deleteInputText";
import deleteInputText, { deleteNewOrgEnteredText } from "../support/check/deleteInputText";
import selectFromDropdownByIndex from '../support/action/selectFromDropdownByIndex';
import checkFirstOrgInList from '../support/check/checkFirstOrgInList';
import addNewOrganisation, { editOrganisationButton } from '../support/action/addNewOrganisation';

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
  /^I click on the last user in the list$/,
  clickLastUserInList
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

When(
  /^I click on the Add role button$/,
  clickAddRoleButton
);

When(
  /^I click on the Idam Docker Service$/,
  clickIdamDockerService
);

When(
  /^I click on the test environment$/,
  clickTestEnvironment
);

When(
  /^I click on the First Role$/,
  clickFirstRole
);

When(
  /^I click on the Second Role$/,
  clickSecondRole
);

When(
  /^I click on the Third Role$/,
  clickThirdRole
);

When(
  /^I click on the Fourth Role$/,
  clickFourthRole
);

When(
  /^I click Save$/,
  clickSave
);

When(/^I add name "([^"]*)" to the filter$/, enterNameToFilter);

When(/^I click on the cancel filter$/, clickCancelFilter);

When(/^I delete entered organisation name$/, deleteEnteredText);

When(/^I delete entered new organisation name$/, deleteNewOrgEnteredText);

When(
	/^I change the number of results on the page by selecting index "([^"]*)"$/,
	selectFromDropdownByIndex
);

When(
  /^I check the first organisation on the page it displays "([^"]*)"$/,
  checkFirstOrgInList
);

When(/^I click on the add organisation button$/, addNewOrganisation);

When(
  /^I click on the first service on the list$/,
  clickFirstService
);

When(/^I click on the edit organisation button$/, editOrganisationButton);

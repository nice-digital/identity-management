import { Then } from "@wdio/cucumber-framework";
import loginErrorMessage from '../support/check/loginErrorMessage.js';
import passwordComplexityErrorMessage from '../support/check/passwordComplexityErrorMessage.js'
import userNameInput from '../support/check/userNameInput.js';
import passwordInput from '../support/check/passwordInput.js';
import confirmEmailInput from '../support/check/confirmEmailInput.js';
import confirmPasswordInput from '../support/check/confirmPasswordInput.js';
import signUpUserNameInput from '../support/check/signUpUserNameInput.js';
import signUpSurnameInput from '../support/check/signUpSurnameInput.js';
import emailInput from '../support/check/emailInput.js';
import manageUsersPage from '../support/check/manageUsersPage.js';
import adminHomepage from '../support/check/adminHomepage.js';
import createaccount from '../support/action/createaccount.js';
import finduser from '../support/action/finduser.js';
import { deleteUser } from '../support/action/deleteUser.js';
import findUserList, { userNotInList, findUserOrganisation, findCurrentUserOrganisation } from '../support/check/findUserInList.js';
import findWebsiteList from '../support/check/findWebsiteInList.js';
import validateDeletionSuccessMessage, {
  validateRegistrationValidationMessages,
} from '../support/check/validateMessages.js';
import validateUserStatusActive, {
  validateUserStatusLocked,
  validateUserStatusListPageLocked,
} from '../support/check/validateUserStatus.js';
import identityLogInPage from '../support/check/identityLogInPage.js';
import validateRoleChange from '../support/check/validateRoleChange.js';
import validateServiceDownloadPageResultCount,  { validateUserDownloadPageResultCount} from '../support/check/validateAdminUserServicePage.js';
import editUserProfile from '../support/action/editUserProfile.js';
import editUserEmailName from '../support/action/editUserEmailName.js';
import editAudienceInsight from '../support/action/editAudienceInsight.js';
import saveUserEditButton from '../support/action/saveUserEditButton.js';
import validateProfileSuccessfulMessage from '../support/check/validateUserStatus.js';
import checkUpdatedUserProfile from '../support/check/checkUpdatedUserProfile.js';
import validateServiceEnvFilterChecked, { validateServiceEnvChecked, clickCancelFilterServiceDetailPage, validateServiceUserRoleChecked } from '../support/check/validateFilterChecked.js';
import validateOrganisationsDownloadPageResultCount from '../support/check/validateAdminOrgPage.js';
import validateAdminOrgPage, { validateFirstLinkInPagination, validatePreviousPage } from "../support/check/validateAdminOrgPage.js";
import clickPaginationOption, {	clickNextPagination,	clickPreviousPagination } from "../support/action/clickPaginationOption.js";
import addOrganisationName, { editOrganisationName } from '../support/action/addOrganisationName.js';
import saveNewOrganisationName, { saveEditOrgButton } from '../support/action/saveNewOrganisationName.js';
import validateNewOrgResponseMessage , { validateErrorMessage, validateOrganisationDate, validateEditOrgResponseMessage, validateUserMessage } from '../support/check/validateNewOrgResponseMessage.js';
import navigateToOrgListPage, { navigateToOrgListPageUsingBreadscrumb, navigateDetailPage } from '../support/action/navigateToOrgListPage.js';
import findOrganisationList from '../support/check/findOrganisationList.js';
import removeUserOrganisation from '../support/action/removeUserOrganisation.js';
import {checkForAccessibilityIssues} from "../support/check/checkForAccessibilityIssues.js";

Then(/^I expect the error message is displayed$/, loginErrorMessage);

Then(/^I expect the password Complexity reset error message is displayed$/, passwordComplexityErrorMessage);

Then(/^I expect that username input field does( not)* exist$/, userNameInput);

Then(/^I expect that password input field does( not)* exist$/, passwordInput);

Then(/^I expect that email input field does( not)* exist$/, emailInput);

Then(
  /^I expect that confirm email input field does( not)* exist$/,
  confirmEmailInput
);

Then(
  /^I expect that confirm password input field does( not)* exist$/,
  confirmPasswordInput
);

Then(/^I expect that name input field does( not)* exist$/, signUpUserNameInput);

Then(
  /^I expect that surname input field does( not)* exist$/,
  signUpSurnameInput
);

Then(/^I expect I appear on the Manage Users page$/, manageUsersPage);

Then(/^I expect I appear on the Identity Admin homepage$/, adminHomepage);

Then(
  /^I can successfuly register with username "([A-Z0-9_]+)" and password "([A-Z0-9_]+)"$/,
  createaccount
);

Then(
  /^An account exists in "([A-Z0-9_]+)" with the username "([A-Z0-9_]+)"$/,
  finduser
);

Then(/^I delete the user "([A-Z0-9_]+)" from "([A-Z0-9_]+)"$/, deleteUser);

Then(/^I expect user "([^"]*)" to exist in the list$/, findUserList);

Then(/^I expect user "([^"]*)" does not exist in the list$/, userNotInList);

Then(
  /^I expect the deletion successful message "([^"]*)" to be displayed$/,
  validateDeletionSuccessMessage
);

Then(
  /^I expect the registration page validation messages are displayed$/,
  validateRegistrationValidationMessages
);

Then(/^I expect I appear on the login page$/, identityLogInPage);

Then(
  /^I expect that the status of the user appears as Active$/,
  validateUserStatusActive
);

Then(
  /^I expect that the status of the user appears as Locked$/,
  validateUserStatusLocked
);

Then(
  /^I expect that the status of the user on the user list page is also Locked$/, validateUserStatusListPageLocked
);

Then(
  /^I expect the user roles to be successfully changed$/,
  validateRoleChange
);

Then(/^I expect website "([^"]*)" to exist in the list$/, findWebsiteList);

Then(
	/^I expect the services result list count contains "([^"]*)"$/,
	validateServiceDownloadPageResultCount
);
Then(
	/^I expect the users result list count contains "([^"]*)"$/,
	validateUserDownloadPageResultCount
);
Then(
	/^I click on the Edit profile button$/,
	editUserProfile
);
Then(
	/^I edit user email "([A-Z0-9_]+)", firstname "([A-Z0-9_]+)" and lastname "([A-Z0-9_]+)"$/,
	editUserEmailName
);
Then(
	/^I edit the audience insight option$/,
	editAudienceInsight
);
Then(
	/^I click on the save button$/,
	saveUserEditButton
);
Then(
	/^I expect the successful message to be displayed$/,
	validateProfileSuccessfulMessage
);
Then(
	/^I check user profile is updated$/,
	checkUpdatedUserProfile
);
Then(
	/^I expect the organisations result list count contains "([^"]*)"$/,
	validateOrganisationsDownloadPageResultCount
);
Then(
	/^I expect the first pagination option is "([^"]*)"$/,
	validateFirstLinkInPagination
);
Then(/^I click the next pagination option$/, clickNextPagination);

Then(/^I expect the first pagination option is now "([^"]*)"$/, validatePreviousPage);

Then(/^I click the previous pagination option$/, clickPreviousPagination);

Then(/^I add new organisation name "([^"]*)"$/, addOrganisationName);

Then(/^I click on the save organisation button$/, saveNewOrganisationName);

Then(/^I expect the feedback message "([^"]*)" to be displayed$/, validateNewOrgResponseMessage);

Then(/^I navigate back to organisation list admin page$/, navigateToOrgListPageUsingBreadscrumb);

Then(/^I click on the first organisation in the list$/, findOrganisationList);

Then(/^I expect to see error message "([^"]*)"$/, validateErrorMessage);

Then(/^I select Dev status filter$/, validateServiceEnvChecked);

Then(/^I click on the cancel filter on the service detail page$/, clickCancelFilterServiceDetailPage);

Then(/^I verify user details is displayed$/, validateServiceUserRoleChecked);

Then(/^I expect organisation date added "([^"]*)" to be displayed$/, validateOrganisationDate);

Then(/^I expect user "([^"]*)" to exist in the organisation list$/, findUserOrganisation);

Then(/^I edit organisation name "([^"]*)"$/, editOrganisationName);

Then(/^I click on the edit save organisation button$/, saveEditOrgButton);

Then(/^I expect successful message "([^"]*)"$/, validateEditOrgResponseMessage);

Then(/^I expect user "([^"]*)" to exist in the organisation user list$/, findCurrentUserOrganisation);

Then(/^I click to remove user "([^"]*)"$/, removeUserOrganisation);

Then(/^I expect successful message for the user "([^"]*)"$/, validateUserMessage);

Then(/^I click cancel button to navigate back to detail page$/, navigateDetailPage);

Then(/^the page should have no(?: (A|AA))? accessibility issues$/,checkForAccessibilityIssues);
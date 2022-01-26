import '@nice-digital/wdio-cucumber-steps/lib/then';
import loginErrorMessage from '../support/check/loginErrorMessage';
import { Then } from 'cucumber';
import userNameInput from '../support/check/userNameInput';
import passwordInput from '../support/check/passwordInput';
import confirmEmailInput from '../support/check/confirmEmailInput';
import confirmPasswordInput from '../support/check/confirmPasswordInput';
import signUpUserNameInput from '../support/check/signUpUserNameInput';
import signUpSurnameInput from '../support/check/signUpSurnameInput';
import emailInput from '../support/check/emailInput';
import manageUsersPage from '../support/check/manageUsersPage';
import adminHomepage from '../support/check/adminHomepage';
import createaccount from '../support/action/createaccount';
import finduser from '../support/action/finduser';
import deleteUser from '../support/action/deleteUser';
import findUserList, { userNotInList } from '../support/check/findUserInList';
import findWebsiteList from '../support/check/findWebsiteInList';
import validateDeletionSuccessMessage, {
  validateRegistrationValidationMessages,
} from '../support/check/validateMessages';
import validateUserStatusActive, {
  validateUserStatusLocked,
  validateUserStatusListPageLocked,
} from '../support/check/validateUserStatus';
import identityLogInPage from '../support/check/identityLogInPage';
import validateRoleChange from '../support/check/validateRoleChange';
import validateServiceDownloadPageResultCount,  { validateUserDownloadPageResultCount} from '../support/check/validateAdminUserServicePage';
import editUserProfile from '../support/action/editUserProfile'
import editUserEmailName from '../support/action/editUserEmailName'
import editAudienceInsight from '../support/action/editAudienceInsight'
import saveUserEditButton from '../support/action/saveUserEditButton'
import validateProfileSuccessfulMessage from '../support/check/validateUserStatus'
import checkUpdatedUserProfile from '../support/check/checkUpdatedUserProfile';
import validateOrganisationsDownloadPageResultCount from '../support/check/validateAdminOrgPage';
import validateAdminOrgPage, { validateFirstLinkInPagination } from "../support/check/validateAdminOrgPage";
import clickPaginationOption, {
	clickSecondPaginationOption,
	clickNextPagination,
	clickPreviousPagination,
} from "../support/action/clickPaginationOption";
import editOrganisationName from '../support/action/editOrganisationName';
import saveNewOrganisationName from '../support/action/saveNewOrganisationName';
import validateNewOrgResponseMessage , { validateErrorMessage } from '../support/check/validateNewOrgResponseMessage';
import navigateToOrgListPage, { navigateToOrgListPageUsingBreadscrumb } from '../support/action/navigateToOrgListPage';
import findOrganisationList from '../support/check/findOrganisationList';


Then(/^I expect the error message is displayed$/, loginErrorMessage);

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
Then(/^I click the second pagination option$/, clickSecondPaginationOption);

Then(/^I click the next pagination option$/, clickNextPagination);

Then(/^I click the previous pagination option$/, clickPreviousPagination);

Then(/^I add new organisation name "([^"]*)"$/, editOrganisationName);

Then(/^I click on the save organisation button$/, saveNewOrganisationName);

Then(/^I expect the feedback message "([^"]*)" to be displayed$/, validateNewOrgResponseMessage);

Then(/^I navigate back to organisation list admin page$/, navigateToOrgListPageUsingBreadscrumb);

Then(/^I click on the first organisation in the list$/, findOrganisationList);

Then(/^I expect to see error message "([^"]*)"$/, validateErrorMessage);



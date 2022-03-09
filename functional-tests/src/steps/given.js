import '@nice-digital/wdio-cucumber-steps/lib/given';
import { Given } from 'cucumber';
import navigateToRegPage from '../support/action/navigateToRegPage';
import {
  navigateToUserListPageUsingBreadscrumb,
  navigateToUserListPageFromAdminPage,
} from '../support/action/navigateToUserListPage';
import {  navigateToWebsiteListPageFromAdminPage } from '../support/action/navigateToWebsiteListPage';
import validateServiceEnvFilterChecked, {  validateUserStatusFilterChecked, validateUserEnvFilterChecked, validateUserRolesFilterChecked, validateUserRoleFilterChecked } from '../support/check/validateFilterChecked';
import navigateToOrganisationListPageFromAdminPage from '../support/action/navigateToOrganisationListPage';
import manageOrganisationsPage from '../support/check/manageOrganisationsPage';
import sortAlphaOrganisationList from '../support/action/sortOrganisationList';
import sortOrganisationList, { sortDateOrganisationList } from '../support/action/sortOrganisationList';


Given(/^I navigate to the registration page$/, navigateToRegPage);

Given(
  /^I navigate to the user list page$/,
  navigateToUserListPageUsingBreadscrumb
);

Given(
  /^I click on the manage user button$/,
  navigateToUserListPageFromAdminPage
);

Given(
  /^I click on the manage services button$/,
  navigateToWebsiteListPageFromAdminPage
);

Given(/^I select alpha and test status filter$/, validateServiceEnvFilterChecked);

Given(/^I select active and pending status filter$/, validateUserStatusFilterChecked);

Given(/^I select alpha and test service filter$/, validateUserEnvFilterChecked);

Given(
  /^I click on the manage organisations button$/,
  navigateToOrganisationListPageFromAdminPage
);
Given(/^I expect I appear on the Organisations list page$/, manageOrganisationsPage);

Given(/^I sort orgnanisation list using the alphabetical sorting descending order$/, sortAlphaOrganisationList);

Given(/^I sort organisation list using the date sorting descending order$/, sortDateOrganisationList);
Given(/^I select Product manager and Product administrator roles filter$/, validateUserRolesFilterChecked);

Given(/^I select Product editor role filter$/, validateUserRoleFilterChecked);

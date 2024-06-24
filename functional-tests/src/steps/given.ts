import { Given } from "@wdio/cucumber-framework";
import navigateToRegPage from '../support/action/navigateToRegPage.js';
import {
  navigateToUserListPageUsingBreadscrumb,
  navigateToUserListPageFromAdminPage,
} from '../support/action/navigateToUserListPage.js';
import {  navigateToWebsiteListPageFromAdminPage } from '../support/action/navigateToWebsiteListPage.js';
import validateServiceEnvFilterChecked, {  validateUserStatusFilterChecked, validateUserEnvFilterChecked, validateUserRolesFilterChecked, validateUserRoleFilterChecked } from '../support/check/validateFilterChecked.js';
import navigateToOrganisationListPageFromAdminPage from '../support/action/navigateToOrganisationListPage.js';
import manageOrganisationsPage from '../support/check/manageOrganisationsPage.js';
import sortAlphaOrganisationList from '../support/action/sortOrganisationList.js';
import sortOrganisationList, { sortDateOrganisationList } from '../support/action/sortOrganisationList.js';
import openWebsite from '../support/action/openWebsite.js';

Given(
    /^I open the (url|site) "([^"]*)?"$/,
    openWebsite
);

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

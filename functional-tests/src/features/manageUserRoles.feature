Feature: Manage User Roles
  As a user of NICE Identity Admin User
  We can access the Manage Users page
  We can click to view a users detail page
  We can select a service
  We can select a website
  We can select the environment
  We can select to roles we want to assign to the user for that website

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage user button

  Scenario: Manage User Roles
    Given I expect I appear on the Manage Users page
    When I click on the last user in the list
    And I click on the Add role button
    Then the page should have no A accessibility issues
    And I click on the Idam Docker Service
    Then the page should have no A accessibility issues
    And I click on the test environment
    Then the page should have no A accessibility issues
    And I click on the First Role
    And I click on the Second Role
    And I click on the Third Role
    And I click on the Fourth Role
    And I click Save
    Then the page should have no A accessibility issues
    Then I expect the user roles to be successfully changed
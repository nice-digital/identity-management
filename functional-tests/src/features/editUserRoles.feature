Feature: Edit User Roles
  As a user of NICE Identity Admin User
  We can access the Manage Users page
  We can click to edit a users detail page and save

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage user button

  Scenario: Edit User Roles
    Given I expect I appear on the Manage Users page
    When I add name "Donald" to the filter
    When I click on the last user in the list
    Then the page should have no A accessibility issues
    Then I click on the Edit profile button
    Then the page should have no A accessibility issues
    Then I edit user email "USER_EMAIL1", firstname "FIRSTNAME1" and lastname "LASTNAME1"
    Then I edit the audience insight option
    Then I click on the save button
    Then I expect the successful message to be displayed
    Then the page should have no A accessibility issues
    Then I check user profile is updated





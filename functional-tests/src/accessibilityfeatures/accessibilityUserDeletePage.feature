Feature: Accessibility testing on user delete page
  As a user of NICE Identity user admin page
  We can check accessibility on user delete page

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage user button

  Scenario: Accessibility testing on user delete page
    When I click on the first user in the list
    And I click on the delete user link
    Then the page should have no accessibility issues





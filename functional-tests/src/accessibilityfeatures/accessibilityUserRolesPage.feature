Feature: Accessibility testing on user select role page
  As a user of NICE Identity user admin page
  We can check accessibility on user select role page

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage user button

  Scenario: Accessibility testing on user select role page
    When I click on the first user in the list
    And I click on the Add role button
    And I click on the Idam Docker Service
    And I click on the test environment
    Then the page should have no accessibility issues




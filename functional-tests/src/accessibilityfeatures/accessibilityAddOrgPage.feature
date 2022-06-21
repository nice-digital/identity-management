Feature: Accessibility testing on add organisation page
  As a user of NICE Identity organisation admin page
  We can check accessibility on add organisation page

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage organisations button

  Scenario: Accessibility testing on add organisation page
    Given I expect I appear on the Organisations list page
    When I click on the add organisation button
    Then the page should have no accessibility issues

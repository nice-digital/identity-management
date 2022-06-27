Feature: Accessibility testing on organisation admin pages
  As a user of NICE Identity organisation admin page
  We can check accessibility on organisation admin pages
  

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage organisations button

  Scenario: Accessibility testing on organisation admin pages
    Given I expect I appear on the Organisations list page
    Then the page should have no accessibility issues

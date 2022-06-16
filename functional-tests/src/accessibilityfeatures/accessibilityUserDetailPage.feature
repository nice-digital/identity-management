Feature: Accessibility testing on user detail page
  As a user of NICE Identity user admin page
  We can check accessibility on user detail page

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage user button

  Scenario: Accessibility testing on user detail page
    When I click on the first user in the list
    Then the page should have no accessibility issues


Feature: Accessibility testing on organisation delete page
  As a user of NICE Identity organisation admin page
  We can check accessibility on organisation delete page
  

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage organisations button

  Scenario: Accessibility testing on organisation delete page
    Given I expect I appear on the Organisations list page
    When I add name "Clinical Trial 2 Nursing" to the filter
    Then I click on the first organisation in the list
    When I click on the delete organisation button
    Then the page should have no accessibility issues

Feature: Accessibility testing on services roles page
  As a user of NICE Identity services admin pages
  We can check accessibility on services roles page
  

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage services button

  Scenario: Accessibility testing on services roles page
   When I add name "EPPI Reviewer" to the filter
   When I click on the first service on the list
   Then the page should have no accessibility issues
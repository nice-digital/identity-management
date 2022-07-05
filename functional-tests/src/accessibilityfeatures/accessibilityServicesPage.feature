Feature: Accessibility testing on services list page
  As a user of NICE Identity services admin pages
  We can check accessibility on services list page
  

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage services button

  Scenario: Accessibility testing on services list page
   Then the page should have no accessibility issues

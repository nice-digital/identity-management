Feature: Manage Organisation List
  As a user of NICE Identity Organisation page
  We can access the Organisations page
  We expect to be presented with a list of organisations
  

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage organisations button

  Scenario: Navigate to Manage Organisations homepage
    Given I expect I appear on the Organisations list page
    Then the page should have no A accessibility issues
    When I add name "Just1Organization" to the filter
    Then I click on the first organisation in the list
    


  
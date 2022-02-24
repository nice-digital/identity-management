Feature: Manage Services Page Dispalys Websites
  As a user of NICE Identity Service page
  We expect to be presented with a list of websites

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage services button

  Scenario: Navigate to Manage Services homepage
    Then I select Dev status filter
    When I add name "EPPI Reviewer" to the filter
    When I click on the first service on the list
    Then I expect the users result list count contains "Showing 5 users"
    Given I select Product manager and Product administrator roles filter
    Then I expect the users result list count contains "Showing 2 users"
    Then I click on the cancel filter on the service detail page
    Given I select Product editor role filter
    Then I expect the users result list count contains "Showing 1 user"

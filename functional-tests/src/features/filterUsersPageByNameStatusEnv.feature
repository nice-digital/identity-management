Feature: The list of users is reduced when user filter by name, status and services
  As a user of NICE Identity Manage Users page
  We want to be able to filter by name , status and services

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage user button

  Scenario: User can filter by name, status and services
    Given I expect the users result list count contains "Showing 7 users"
    Given I select active and pending status filter
    Then I expect the users result list count contains "Showing 7 users"
    Given I select alpha and test service filter
    Then I expect the users result list count contains "Showing 1 user"
    When I add name "Polly" to the filter
    Then I expect the users result list count contains "Showing 1 user"
    When I click on the cancel filter
    Then I expect the users result list count contains "Showing 1 user"

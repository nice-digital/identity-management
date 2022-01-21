Feature: The list of users is reduced when user filter by service name and services
  As a user of NICE Identity Manage Services page
  We want to be able to filter by service name and services

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage services button

  Scenario: User can filter by service name and services
    Given I expect the services result list count contains "Showing 5 services"
    Given I select alpha and test status filter
    Then I expect the services result list count contains "Showing 3 services"
    When I add name "test" to the filter
    Then I expect the services result list count contains "Showing 2 services"


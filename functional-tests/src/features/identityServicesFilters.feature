Feature: Services admin page filters
  As a user of NICE Identity Admin page
  We want to be able to filter the services list by either Service name, URL, Environments and number of results displayed on page

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage user button

  Scenario: User can filter the services list by either Service name, URL, Environments and number of results displayed on page

    Then I expect the result list count contains "Showing 1 to 25 of 29 services"
    When I add "Consultation Comments" to the filter
    Then I expect the result list count contains "Showing 6 service"
    When I click on the cancel filter
    Then I expect the result list count contains "Showing 1 to 25"
    When I add "alpha.nice.org.uk" to the filter
    Then I expect the result list count contains "Showing 1 service"
    When I click on the cancel filter
    Then I expect the result list count contains "Showing 1 to 25"
    When I change the number of results on the page by selecting index "1"
    Then I expect the result list count contains "Showing 29 services"
    When I change the number of results on the page by selecting index "2"
    Then I expect all results are displayed
    Given I select Beta and Alpha environment filter
    Then I expect the result list count contains "Showing 11 services"

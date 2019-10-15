Feature: Admin Page Dispalys Users
  As a user of NICE Identity Admin page
  We expect to be presented with a list of users

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"

  Scenario: Navigate to Identity Admin homepage
    Then I expect that the url is "http://idam:8080/users"
    Then I expect that element "([^"]*)?"( not)* contains the text "([^"]*)?"
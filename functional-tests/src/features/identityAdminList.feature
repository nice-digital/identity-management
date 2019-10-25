Feature: Admin Page Dispalys Users
  As a user of NICE Identity Admin page
  We expect to be presented with a list of users

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"

  Scenario: Navigate to Identity Admin homepage
    Then I expect user "Cliff Booth" to exist in the list
    When I click on the first user in the list
    And I click on the delete user link
    And I click on the confirm delete button
    And I expect user "Cliff Booth" does not exist in the list


Feature: Manage Users Page Dispalys Users
  As a user of NICE Identity Manage Users page
  We expect to be presented with a list of users

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage user button

  Scenario: Navigate to Manage Users
    Given I expect user "Kristin Patrick" to exist in the list
    When I click on the first user in the list
    And I click on the delete user link
    And I click on the confirm delete button
    # Then I expect the deletion successful message "The user Kristin Patrick was successfully deleted." to be displayed
    # When I click on the back to users link
    # And I expect user "Kristin Patrick" does not exist in the list


Feature: Manage organisation user
  As a user of NICE Identity Organisation page
  We can add and remove organisation users


  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage organisations button

  Scenario: Manage organisation details and view assigned user
    Given I expect I appear on the Organisations list page
    When I add name "The Justified Ancients of Mu Mu" to the filter
    Then I click on the first organisation in the list
    When I click on the edit users button
    Then I expect user "Aisha Bartlett" to exist in the organisation user list
    Then I click to remove user "Aisha Bartlett"
    And I expect successful message for the user "User has been successfully removed."
    When I search and add an active user "Aisha"
    And I expect successful message for the user "User has been successfully added."
    Then I expect user "Aisha Bartlett" to exist in the organisation user list
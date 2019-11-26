Feature: Lock/Unlock Users
  As a user of NICE Identity Admin User
  We can access the NICE Admin User page
  We can click to view a users detail page
  We can lock the user
  We can unlock the user

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"

  Scenario: Lock/Unlock user
    Given I expect I appear on the Identity Admin homepage
    When I click on the second user in the list
    Then I expect that the status of the user appears as Active
    When I click on the Lock user button
    Then I expect that the status of the user appears as Locked
    Given I navigate to the user list page
    Then I expect that the status of the user on the user list page is also Locked
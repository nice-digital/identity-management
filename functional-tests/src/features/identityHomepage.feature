Feature: Guidance list
  As a user of NICE Identity 
  We can access the NICE identity page

  Background:
    Given I open the url "/"

  Scenario: Navigate to Identity homepage
    Given I wait on element ".auth0-lock-name" to be visible
    Then I expect that element ".auth0-lock-name" contains any text
    And I expect that element ".auth0-lock-name" contains the text "NICE"

  Scenario: Failed Login
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD"
    Then I expect the error message is "WRONG EMAIL OR PASSWORD."

  Scenario: Successful Login
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD_CORRECT"
    And I wait on element "h1" to be visible
    Then I expect that element "h1" matches the text "User Admin Portal"
    Then I expect the error message is "YOUR ACCOUNT HAS BEEN BLOCKED AFTER MULTIPLE CONSECUTIVE LOGIN ATTEMPTS."
    When I click on the link ""

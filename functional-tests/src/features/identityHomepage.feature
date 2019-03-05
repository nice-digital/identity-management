Feature: Guidance list
  As a user of NICE Identity 
  We can access the NICE identity page

  Background:
    Given I open the url "/"

  Scenario: Navigate to Identity homepage
    Given I wait on element "h1" to be visible
    And I wait on element "[data-qa-sel='login-email']" to be visible
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    And I debug
    Then I wait on element "h1" to be visible
    Then I expect that element "h1" contains any text
    And I expect that element "h1" contains the text "User Admin Portal"
    Then I expect that element "body input[name='userName']" does exist

  # Scenario: Failed Login
  #   When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD"
  #   Then I expect the error message is "WRONG EMAIL OR PASSWORD."

  # Scenario: Successful Login
  #   When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD_CORRECT"
  #   And I wait on element "h1" to be visible
  #   Then I expect that element "h1" matches the text "User Admin Portal"
  #   Then I expect the error message is "YOUR ACCOUNT HAS BEEN BLOCKED AFTER MULTIPLE CONSECUTIVE LOGIN ATTEMPTS."
  #   When I click on the link ""

Feature: Guidance list
  As a user of NICE Identity 
  We can access the NICE identity page

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"

  Scenario: Navigate to Identity Admin homepage
    Then I expect I appear on the Identity Admin homepage

  # Scenario: Failed Login
  #   When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD"
  #   Then I expect the error message is "WRONG EMAIL OR PASSWORD."

  # Scenario: Successful Login
  #   When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD_CORRECT"
  #   And I wait on element "h1" to be visible
  #   Then I expect that element "h1" matches the text "User Admin Portal"
  #   Then I expect the error message is "YOUR ACCOUNT HAS BEEN BLOCKED AFTER MULTIPLE CONSECUTIVE LOGIN ATTEMPTS."
  #   When I click on the link ""

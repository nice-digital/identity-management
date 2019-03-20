Feature: Successful Registration
  As a user of NICE Identity
  We can successfully register for an account

  Background:
    Given I open the url "/"
    And I navigate to the registration page

  Scenario: Register an account
    Then I can successfuly register with username "ACCOUNTS_EMAIL3" and password "ACCOUNTS_PASSWORD2"
    And An account exists in "ALPHA_USER_API" using "ALPHA_API_KEY" with the username "ACCOUNTS_EMAIL3"
    And I delete the user "ACCOUNTS_EMAIL3" from "ALPHA_USER_API" using "ALPHA_API_KEY"
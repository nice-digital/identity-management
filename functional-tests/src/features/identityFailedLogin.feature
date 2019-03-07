Feature: Failed Login
  As a user of NICE Identity
  We expect to be presented 

  Background:
    Given I open the url "/"
    When I log into accounts with username "IDENTITY_NOUSER_EMAIL" and password "ACCOUNTS_PASSWORD2"

  Scenario: Navigate to Identity Admin homepage
    Then I expect the error message is "Invalid email or password"

Feature: Failed Login due to Password Complexity
  As a user of NICE Identity
  We expect to be presented with new Password policy message

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL_FAIL_COMPLEXITY" and password "ACCOUNTS_PASSWORD_FAIL_COMPLEXITY"

  Scenario: Navigate to Reset Password Page with Password Complexity Message
    Then I expect the password Complexity reset error message is displayed

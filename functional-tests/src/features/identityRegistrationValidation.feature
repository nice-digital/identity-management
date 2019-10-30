Feature: Registration Validation
  As a user of NICE Identity
  I want to complete the registration page
  I want the registration to feedback any validation errors

  Background:
    Given I open the url "/"
    And I navigate to the registration page

  Scenario: Register an account
    When I click the register button without completing any details
    Then I expect the registration page validation messages are displayed

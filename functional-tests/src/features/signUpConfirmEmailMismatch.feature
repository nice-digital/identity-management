Feature: Registration Validate Email
    So that I can access restricted NICE websites
    As a new user
    I want to create an NICE account with the correct email


  Background:
    Given I open the url "/login?client=none"

  Scenario: Mismatching Email and Confirm Email Inputs
    Given I wait on element "title" to exist    
    And I wait on element "h1" to exist    
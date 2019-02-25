Feature: Custom Login page
  As a user of NICE websites
  We can login to access any restricted websites

  Background:
    Given I open the url "/login?client=none" 

  Scenario: User Login page
    Given I wait on element "title" to exist    
    And I wait on element "h1" to exist    
    Then I expect that element "h1" contains the text "NICE accounts"
    And I expect that username input field does exist
    And I expect that password input field does exist
    And I expect that confirm email input field does not exist
    And I expect that button ".btn" contains the text "Sign in"
    

    Scenario: User Registration Page
    Given I wait on element "title" to exist    
    And I wait on element "h1" to exist    
    Then I expect that element "h1" contains the text "NICE accounts"
    Then I wait on element ".navigation" to exist
    When I click on the Register link
    And I pause for 2000ms
    Then I expect that confirm email input field does exist
    And I expect that confirm password input field does exist
    And I expect that name input field does exist
    And I expect that surname input field does exist
    And I expect that button ".btn" contains the text "Sign up"
    
    
    

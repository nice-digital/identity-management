Feature: Custom Login page
  As a user of NICE websites
  We can login to access NICE restricted websites

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
    
Scenario: Failed Login
    When I log into accounts with username "ACCOUNTS_EMAIL2" and password "ACCOUNTS_PASSWORD2"
     
    #Then I expect the error message is "YOUR ACCOUNT HAS BEEN BLOCKED AFTER MULTIPLE CONSECUTIVE LOGIN ATTEMPTS."



    
    
    

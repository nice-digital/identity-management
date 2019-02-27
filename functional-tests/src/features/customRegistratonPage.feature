Feature: Custom Registraton page
    So that I can access restricted NICE websites
    As a new user
    I want to create an NICE account

    Background:
        Given I open the url "/login?client=none"

    Scenario: User Registration Page
        Given I wait on element "title" to exist
        And I wait on element "h1" to exist
        Then I expect that element "h1" contains the text "NICE accounts"        
        When I click on the Register link        
        Then I expect that email input field does exist
        Then I expect that confirm email input field does exist
        And I expect that confirm password input field does exist
        And I expect that name input field does exist
        And I expect that surname input field does exist
        And I expect that button ".btn" contains the text "Sign up"

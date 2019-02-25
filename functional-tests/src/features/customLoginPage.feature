Feature: Custom Login page
  As a user of NICE websites
  We can login to access any restricted websites

  Background:
    Given I open the url "/login?client=none" 

  Scenario: Navigate to Customer Login page
    Given I wait on element "title" to exist    
    And I wait on element "h1" to exist    
    Then I expect that element "h1" contains the text "NICE accounts"
    Then I expect that username input field does exist
    Then I wait on element ".navigation" to exist
    Then I wait on element ".mainContainer.col > div > a:nth-child(3)" to exist
   Then I expect that element ".mainContainer.col > div > a:nth-child(3)" does exist
   #When I click on the element ".mainContainer.col > div > a:nth-child(3)"
   When I click on the Register link
    
    
    

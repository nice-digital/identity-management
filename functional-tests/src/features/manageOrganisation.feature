Feature: Manage organisation details
  As a user of NICE Identity Organisation page
  We can manage and view organisations details and associated users
  We can also edit organisation name
  

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage organisations button

  Scenario: Manage organisation details and view assigned user
    Given I expect I appear on the Organisations list page
    When I add name "Clinical Trial 2 Nursing" to the filter
    Then I click on the first organisation in the list
    Then I expect organisation date added "3 January 2022 16:46" to be displayed
    Then I expect user "Thomas Holding" to exist in the organisation list
    When I click on the edit organisation button
    Then I edit organisation name "abbot medical"
    Then I click on the edit save organisation button
	  Then I expect to see error message "Cannot change to abbot medical, that organisation already exists!"
    Then I edit organisation name "The Musical Streets"
    Then I click on the edit save organisation button
    And I expect successful message "The organisation details have been updated successfully."



  
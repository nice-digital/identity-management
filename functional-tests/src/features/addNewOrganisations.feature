Feature: Add new Organisation
  As a user of NICE Identity Organisation page
  We can add new organisations 
  We want to check if an organisation already exist
  

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage organisations button

  Scenario: Add new Organisation and check for if an organisation already exist
    Given I expect I appear on the Organisations list page
    When I click on the add organisation button
	  Then I add new organisation name "ABBOT MEDICAL"
	#  Then I expect to see error message "Organisation already exists - name should be unique"
    When I delete entered new organisation name
    Then I add new organisation name "Abbot Medical London"
    Then I click on the save organisation button
    Then I expect the feedback message "New organisation has been added successfully." to be displayed
	  And I navigate back to organisation list admin page 
    Given I expect I appear on the Organisations list page
    When I add name "ABBOT MEDICAL" to the filter
    Then I expect the organisations result list count contains "Showing 2 organisation"


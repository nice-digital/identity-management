Feature: The list of Organisation is reduced when user filter by name
	As a user of NICE Identity Organisation page
	We want to be able to filter the organisation list by Name and check number of results displayed on page



	Background:
		Given I open the url "/"
		When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
		Given I click on the manage organisations button

	Scenario: User can filter for organisation list by name and number of results
		Given I expect I appear on the Organisations list page
		Then I expect the organisations result list count contains "Showing 1 to 25 of 27 organisations"
		When I add name "Just1Organization" to the filter
		Then I expect the organisations result list count contains "Showing 1 organisation"
		When I delete entered organisation name
		Then I expect the organisations result list count contains "Showing 1 to 25 of 27 organisations"
		When I change the number of results on the page by selecting index "1"
		Then I expect the organisations result list count contains "Showing 28 organisations"
		When I change the number of results on the page by selecting index "2"
		Then I expect the organisations result list count contains "Showing 28 organisations"
		Given I sort orgnanisation list using the alphabetical sorting descending order
		When I check the first organisation on the page it displays "The Justified Ancients of Mu Mu"
		Given I sort organisation list using the date sorting descending order
		When I check the first organisation on the page it displays "Abbot Medical London"
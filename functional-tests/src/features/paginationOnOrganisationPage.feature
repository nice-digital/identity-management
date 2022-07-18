Feature: Users can page through the list of organisations pagination
	As a user of NICE Identity Organisation page
	We want to be able to page through the list of organisations pagination

	Background:
		Given I open the url "/"
		When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"
		Given I click on the manage organisations button

	Scenario: User can page through the list of organisation pagination
		Given I expect the organisations result list count contains "Showing 1 to 25 of 28 organisations"
		Then I expect the first pagination option is "1"
		Then I click the next pagination option
		Then I expect the first pagination option is now "Previous page"
		And I click the previous pagination option
		Then I expect the first pagination option is "1"
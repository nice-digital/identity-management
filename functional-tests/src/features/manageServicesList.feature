Feature: Manage Services Page Dispalys Websites
  As a user of NICE Identity Service page
  We expect to be presented with a list of websites

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL5" and password "ACCOUNTS_PASSWORD2"
    Given I click on the manage services button

  Scenario: Navigate to Manage Services homepage
    Then I expect website "EPPI Reviewer" to exist in the list
    # More things to test when IDAM-441 is done and you can navigate further



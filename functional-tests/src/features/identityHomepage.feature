Feature: Successful Login
  As a user of NICE Identity 
  We can access the NICE identity page

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"

  Scenario: Navigate to Identity Admin homepage
    Then I expect I appear on the Identity Admin homepage
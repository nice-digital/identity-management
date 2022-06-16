Feature: Accessibility testing on home page
  As a user of NICE Identity 
  We can access the NICE identity page

  Background:
    Given I open the url "/"
    When I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD2"

  Scenario: Accessibility testing on home page
    Then I expect I appear on the Identity Admin homepage
    Then the page should have no accessibility issues





Feature: Success User Login
    As a user of NICE websites
    We can login to access NICE restricted websites

    Background:
        Given I open the url "/login?client=none"

    Scenario: Success User Login
        Given I log into accounts with username "ACCOUNTS_EMAIL" and password "ACCOUNTS_PASSWORD"
        And I pause for 10000ms
        When I wait on element "h1" for 10000ms to exist
        And I debug
        Then the page url is "https://alpha-identityadmin.nice.org.uk/Home/Error"
   
import "@nice-digital/wdio-cucumber-steps/lib/when";
import { Login } from "../support/action/Login";
import { When } from "cucumber";

When(
  /^I log into accounts with username "([A-Z0-9_]+)" and password "([A-Z0-9_]+)"$/,
  Login
);
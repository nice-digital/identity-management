import {checkUrl} from "@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL";
import selectors from "../selectors";

export async function identityLogInPage(): Promise<void> {
  checkUrl("false", "http://idam:8080/users"); //this is a hack. Need to sort out logout issue.
}

export default identityLogInPage;
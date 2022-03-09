import {checkUrl} from '@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL';

export async function adminHomepage(): Promise<void> {
  checkUrl("", "http://idam:8080/overview");
};

export default adminHomepage;

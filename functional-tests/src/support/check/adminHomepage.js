import checkUrl from '@nice-digital/wdio-cucumber-steps/lib/support/check/checkURL';

export const adminHomepage = () => {
  checkUrl('http://idam:8080/overview');
};

export default adminHomepage;

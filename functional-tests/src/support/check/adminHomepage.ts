import checkUrl from '../check/checkURL.js';

export async function adminHomepage(): Promise<void> {
  await checkUrl(false, "https://idam/overview");
};

export default adminHomepage;

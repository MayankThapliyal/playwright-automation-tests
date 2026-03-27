// import { test as base } from '@playwright/test';
// import LoginPage from '../pages/LoginPage';
// import { users } from './testData.js';

// // Extend Playwright test with a custom "loggedInPage" fixture
// const test = base.extend({
//   loggedInPage: async ({ page }, use) => {
//     const login = new LoginPage(page);

//     await login.gotoLogin();
//     await login.login(
//       users.valid.username,
//       users.valid.password
//     );

//     await use(page);
//   }
// });

// export default test;
import {test as base} from './auth.js';

const test = base.extend({
  loggedInPage: async({authenticatedPage}, use) =>{
    await use(authenticatedPage);
  }
});

export default test;
export {expect} from '@playwright/test';
const { test as base } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('./testData');

// Extend Playwright test with a custom "loggedInPage" fixture
const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);

    await login.gotoLogin();
    await login.login(
      testData.users.valid.username,
      testData.users.valid.password
    );

    await use(page);
  }
});

module.exports = test;

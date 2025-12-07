// import { test, expect } from '@playwright/test';
// // import LoginPage from './pages/LoginPage';
// const LoginPage = require('../pages/LoginPage');

// test.describe('Login Tests', ()=>{

//     test('Valid Login', async({page})=>{
//         const login = new LoginPage(page);
//         await login.gotoLogin();
//         await login.login('standard_user','secret_sauce');

//         await expect(page).toHaveURL(/.*inventory/);
//     });

//     test('Invalid Login', async({page})=>{
//         const login = new LoginPage(page);
//         await login.gotoLogin();
//         await login.login('wrong_user','wrong_pass');

//         const msg = await login.getErrorMessage();
//         expect(msg).toContain('Epic sadface');
//     });
// })

// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.describe('Login Tests', () => {

  test('Valid Login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLogin();
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/.*inventory/);
  });

  test('Invalid Login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.gotoLogin();
    await login.login('wrong_user', 'wrong_pass');

    const msg = await login.getErrorMessage();
    expect(msg).toContain('Epic sadface');
  });

});

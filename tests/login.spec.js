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
import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { users } from '../utils/fixtures/testData.js';

test.describe('Login Tests', ()=>{
  test('Login with valid credentials', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLogin();
    await login.login(users.valid.username, users.valid.password);
    await expect(page).toHaveURL(/.*inventory/);
  });

  test('Login should fail with invalid credentials', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLogin();
    await login.login(users.valid.username, 'wrong_pass');
    
    const msg = await page.locator('[data-test="error"]').textContent();
    expect(msg).toContain('Username and password do not match');
  });
  
  test('Login should fail with non-existent user', async({page})=>{
    const login = new LoginPage(page);
    await login.gotoLogin();
    await login.login('nonexistent_user', 'secret_sauce');

    const msg = await page.locator('[data-test="error"]').textContent();
    expect(msg).toContain('do not match');
  })

})

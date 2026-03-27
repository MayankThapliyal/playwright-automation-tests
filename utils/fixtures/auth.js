import {test as base} from '@playwright/test';
import LoginPage from '../../pages/LoginPage.js';
import {users} from './testData.js';

async function loginWithFreshContext(browser, username, password){
    const context = await browser.newContext({baseURL:process.env.BASE_URL||'https://www.saucedemo.com'});
    const page = await context.newPage();
    const login = new LoginPage(page);
    await login.gotoLogin();
    await login.login(username, password);
    
    return {page,context};
}

export const test = base.extend({
    authenticatedPage: async({page}, use) =>{
        await page.goto('/inventory.html');
        await page.waitForURL(/.*inventory/);
        await use(page);
    },

    lockedPage: async({browser}, use) =>{
       const {page, context} = await loginWithFreshContext(browser,users.locked.username, users.locked.password);
       await use(page);
       await context.close();
    },

    problemPage: async({browser}, use) =>{
        const {page,context} = await loginWithFreshContext(browser, users.problem.username, users.problem.password);
        await page.waitForURL(/.*inventory/);
        await use(page);
        await context.close();
    }
});

export {expect} from '@playwright/test';
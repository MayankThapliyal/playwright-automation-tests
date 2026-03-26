import {test as base} from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import {users} from './testData.js';

export const test = base.extend({
    authenticatedPage: async({page}, use) =>{
        const login = new LoginPage(page);
        await login.gotoLogin();
        await login.login(users.valid.username, users.valid.password);
        await page.waitForURL(/.*inventory/);
        await use(page);
    },

    lockedPage: async({page}, use) =>{
        const login = new LoginPage(page);
        await login.gotoLogin();
        await login.login(users.locked.username, users.locked.password);
        await use(page);
    },

    problemPage: async({page}, use) =>{
        const login = new LoginPage(page);
        await login.gotoLogin();
        await login.login(users.problem.username, users.problem.password);
        await use(page);
    }
});

export {expect} from '@playwright/test';
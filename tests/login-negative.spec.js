import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import { users } from '../utils/fixtures/testData.js';

test.describe('Login Negative Flow', () => {
    test('shows error for invalid password', {tag:'@negative'}, async ({ page }) => {
        const login = new LoginPage(page);

        await login.gotoLogin();
        await login.login(users.valid.username, 'worng_password');

        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Username and password do not match');
    });

    test('shows error for locked out user', {tag:'@negative'}, async ({ page }) => {
        const login = new LoginPage(page);
        await login.gotoLogin();
        
        await login.login(users.locked.username, users.locked.password);
        const error = page.locator('[data-test="error"]');
        expect(error).toBeVisible();
        expect(error).toContainText('locked out');
    });

    test('shows error when username is empty', {tag:'@negative'}, async({page})=>{
        const login = new LoginPage(page);
        await login.gotoLogin();
        
        await login.login('', users.valid.password);
        const error = page.locator('[data-test="error"]');
        expect(error).toBeVisible();
        await expect(error).toContainText('Username is required');
    })

    test('shows error when password is empty', {tag:'@negative'}, async({page})=>{
        const login = new LoginPage(page);
        await login.gotoLogin();
        
        await login.login(users.valid.username), '';
        const error = page.locator('[data-test="error"]');
        expect(error).toBeVisible();
        await expect(error).toContainText('Password is required');
    })
})
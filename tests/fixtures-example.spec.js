import {test, expect} from '@playwright/test';

test.describe('Fixture Example tests', ()=>{

    test('Authenticated user lands on the inventory page', async({authenticatedPage})=>{
        await expect(authenticatedPage).toHaveURL(/.*inventory/);
        await expect(authenticatedPage).locator('.title').toHaveText('Products');
    });

    test('Locked user sees error', async({lockedPage})=>{
        const error = lockedPage.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Sorry, this user has been locked out');
    });

    test('Problem user can still access inventory page', async({problemPage})=>{
        await expect(problemPage).toHaveURL(/.*inventory/);
        await expect(problemPage.locator('.inventory_list')).toBeVisible();
    });
});
import { chromium } from "@playwright/test"; 
import { users } from "../utils/fixtures/testData.js";
import fs from 'fs';

async function globalSetup(){
    if(!fs.existsSync('auth')){
        fs.mkdirSync('auth');
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';
    await page.goto(baseURL);
    
    await page.fill('#user-name', users.valid.username);
    await page.fill('#password', users.valid.password);
    await page.click('#login-button');
    await page.waitForURL(/.*inventory/);

    await page.context.storageState({path: 'auth/auth,json'});
    await browser.close();
}

export default globalSetup;
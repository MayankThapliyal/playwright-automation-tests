// import { chromium } from "@playwright/test"; 
// import { users } from "./testData.js";
// import fs from 'fs';

// async function globalSetup(){
//     if(!fs.existsSync('auth')){
//         fs.mkdirSync('auth');
//     }

//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';
//     await page.goto(baseURL);
    
//     await page.fill('#user-name', users.valid.username);
//     await page.fill('#password', users.valid.password);
//     await page.click('#login-button');
//     await page.waitForURL(/.*inventory/);

//     await page.context().storageState({path: 'auth/auth,json'});
//     await browser.close();
// }

// export default globalSetup;

// ------ code works in work env -----------
// import { chromium } from '@playwright/test';
// import { users } from './testData.js';
// import fs from 'fs';

// const AUTH_DIR = 'auth';
// const AUTH_FILE = 'auth.json';

// async function isStoredSessionValid(browser, baseURL){
//     if(!fs.existsSync(AUTH_FILE)) return false;
// }

// async function loginAndSaveState(browser, baseURL){
//     const page = await browser.newPage();
//     await page.goto(baseURL);
//     await page.fill('#user-name',users.valid.username);
//     await page.fill('#password',users.valid.password);
//     await page.click('#login-button');
//     await page.waitForURL(/.*inventory/);
//     await page.context().storageState({path: AUTH_FILE});
// }

// async function globalSetup(){
//     if(!fs.existsSync(AUTH_DIR)){
//         fs.mkdirSync(AUTH_DIR, {recursive:true});
//     }

//     const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';
//     const browser = await chromium.launch();

//     const validSession = await isStoredSessionValid(browser, baseURL);
//     if(!validSession){
//         await loginAndSaveState(browser, baseURL);
//     }

//     await browser.close();
// }

// export default globalSetup;

// -------code works in personal laptop---------------
import {chromium } from '@playwright/test';
import { users } from './testData.js';
import fs from 'fs';
import path from 'path';

const AUTH_DIR = path.resolve('auth');
const AUTH_FILE = path.resolve('auth/auth.json');

async function globalSetup(){
    if(!fs.existsSync(AUTH_DIR)){
        fs.mkdirSync(AUTH_DIR, {recursive:true});
        console.log('Created Auth folder at', AUTH_DIR);
    }

    const browser = await chromium.launch();
    const page = await browser.newPage();
    const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';
    await page.goto(baseURL);
    await page.fill('#user-name',users.valid.username);
    await page.fill('#password',users.valid.password);
    await page.click('#login-button');
    await page.waitForURL(/.*inventory/);
    console.log('Login successful, saving state to:', AUTH_FILE);
    await page.context().storageState({path: AUTH_FILE});
    await browser.close();
}

export default globalSetup;
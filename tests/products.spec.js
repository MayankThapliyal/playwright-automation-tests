import { expect } from '@playwright/test';
import test from '../utils/fixtures/userFixture.js';
import ProductsPage from '../pages/ProductsPage.js';

test.describe('Products Tests', () => {

  test('Verify products load & add to cart', async ({ loggedInPage }) => {
    const page = loggedInPage;
    const products = new ProductsPage(page);

    const productNames = await products.getAllProductNames();
    expect(productNames.length).toBeGreaterThan(0);

    await products.addFirstProductToCart();

    const count = await products.getCartCount();
    expect(count).toBe(1);
  });

  test('Add multiple products to cart', async({loggedInPage})=>{
    const page = loggedInPage;
    const products = new ProductsPage(page);

    await products.addFirstProductToCart();
    await page.locator('button[data-test^="add-to-cart"]').nth(1).click();

    await products.goToCart();

    const items = await page.locator('.cart_item').count();
    console.log(items);
    expect(items).toBe(2);
  });

  test('Remove product from cart', async({loggedInPage})=>{
    const page = loggedInPage;
    const products = new ProductsPage(page);

    await products.addFirstProductToCart();
    await products.goToCart();

    await page.locator('button[id*="remove"]').click();
    const items = await page.locator('.cart_item').count();
    expect(items).toBe(0);
  });

});

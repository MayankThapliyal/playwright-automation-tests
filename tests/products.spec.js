const { expect } = require('@playwright/test');
const test = require('../fixtures/userFixture');
const ProductsPage = require('../pages/ProductsPage');

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

});

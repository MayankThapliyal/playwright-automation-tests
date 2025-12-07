const { expect } = require('@playwright/test');
const test = require('../fixtures/userFixture');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../fixtures/testData');

test.describe('Checkout Flow', () => {

  test('Complete full checkout order', async ({ loggedInPage }) => {
    const page = loggedInPage;

    // Products page
    const products = new ProductsPage(page);
    await products.addFirstProductToCart();
    await products.goToCart();

    // Cart page
    const cart = new CartPage(page);
    const items = await cart.getCartItems();
    expect(items.length).toBe(1);

    await cart.proceedToCheckout();

    // Checkout page
    const checkout = new CheckoutPage(page);
    await checkout.fillCheckoutInfo(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.postalCode
    );

    await checkout.finishOrder();

    const msg = await checkout.getSuccessMessage();
    expect(msg).toContain('Thank you');
  });

});

//import { expect } from '@playwright/test';
//import test from '../utils/fixtures/userFixture';
import {test,expect} from '../utils/fixtures/auth.js';
import ProductsPage from '../pages/ProductsPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';
import { checkout as _checkout } from '../utils/fixtures/testData.js';

test.describe('Checkout Flow', () => {

  test('Complete full checkout order', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

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
      _checkout.firstName,
      _checkout.lastName,
      _checkout.postalCode
    );

    await checkout.finishOrder();

    const msg = await checkout.getSuccessMessage();
    expect(msg).toContain('Thank you');
  });

});

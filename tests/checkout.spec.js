import { expect } from '@playwright/test';
import test from '../utils/fixtures/userFixture';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import { checkout as _checkout } from '../utils/fixtures/testData';

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
      _checkout.firstName,
      _checkout.lastName,
      _checkout.postalCode
    );

    await checkout.finishOrder();

    const msg = await checkout.getSuccessMessage();
    expect(msg).toContain('Thank you');
  });

});

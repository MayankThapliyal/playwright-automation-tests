// import {expect} from '@playwright/test';
import {test,expect} from '../utils/fixtures/auth.js';
import ProductsPage from '../pages/ProductsPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';
import CartPage from '../pages/CartPage.js';
import {checkout as checkoutData} from '../utils/fixtures/testData.js';

async function goToCheckoutStepOne(page){
    const products = new ProductsPage(page);
    await products.addFirstProductToCart();

    await products.goToCart();

    const cart = new CartPage(page);
    const items = await cart.getCartItems();
    expect(items.length).toBe(1);

    await cart.proceedToCheckout();
}

test.describe('Checkout Negative Flow', ()=>{
    test('Shows error when first name is missing',{tag:'@negative'}, async({authenticatedPage})=>{
        const page = authenticatedPage;
        await goToCheckoutStepOne(page);

        const checkout = new CheckoutPage(page);
        await checkout.fillCheckoutInfo('', checkoutData.lastName, checkoutData.postalCode);
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('First Name is required');
    });

    test('Shows error when last name is missing',{tag:'@negative'}, async({authenticatedPage})=>{
        const page = authenticatedPage;
        await goToCheckoutStepOne(page);

        const checkout = new CheckoutPage(page);
        await checkout.fillCheckoutInfo(checkoutData.firstName, '', checkoutData.postalCode);
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Last Name is required');
    });

    test('Shows error when postal code is missing',{tag:'@negative'}, async({authenticatedPage})=>{
        const page = authenticatedPage;
        await goToCheckoutStepOne(page);

        const checkout = new CheckoutPage(page);
        await checkout.fillCheckoutInfo(checkoutData.firstName, checkoutData.lastName, '');
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('Postal Code is required');
    });
})
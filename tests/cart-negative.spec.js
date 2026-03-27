// import {expect} from '@playwright/test';
import {test,expect} from '../utils/fixtures/auth.js';
import ProductsPage from '../pages/ProductsPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';

test.describe('Cart Negative Flow', ()=>{
    test('shows no remove button when the cart is empty', {tag:'@negative'}, async({ authenticatedPage }) => {
            const page = authenticatedPage;
            const products = new ProductsPage(page);

            await products.goToCart();

            const cartItemsCount = await page.locator('.cart_item').count();
            expect(cartItemsCount).toBe(0);

            const removeButtonCount = await page.locator('button[test-data^="remove"]').count();
            expect(removeButtonCount).toBe(0);
        });

    test('shows validation error when checking out empty cart with blank info', {tag:'@negative'}, async({authenticatedPage})=>{
        const page = authenticatedPage;
        const products = new ProductsPage(page);
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        await products.goToCart();
        await cart.proceedToCheckout();
        await checkout.fillCheckoutInfo('','','');

        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText('First Name is required');
    });

    test('cart count becomes 0 after removing all items', {tag:'@negative'}, async({authenticatedPage})=>{
        const page = authenticatedPage;
        const products = new ProductsPage(page);

        await products.addFirstProductToCart();
        await products.addProductByIndex(1);

        const cartCountBefore = await products.getCartCount();
        expect(cartCountBefore).toBe(2);

        await products.goToCart();

        const removeButtons = page.locator('button[data-test^="remove"]');
        const totalRemoveButtons = await removeButtons.count();

        for(let i=0;i<totalRemoveButtons;i++){
            await removeButtons.first().click();
        }

        const remainingItems = await page.locator('.cart_item').count();
        expect(remainingItems).toBe(0);
    });
})
// import { expect } from "@playwright/test";
import {test,expect} from '../utils/fixtures/auth.js';
import ProductPage from '../pages/ProductsPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';
import { testCases } from "../utils/fixtures/testData.js";

test.describe('Parameterized Checkout Tests', ()=>{
    testCases.forEach((testData, index)=>{
        test(`Complete checkout with user ${index+1}`, async({authenticatedPage})=>{
            const page = authenticatedPage;
            const products = new ProductPage(page);

            await products.addFirstProductToCart();
            await products.goToCart();

            const cart = new CartPage(page);
            const items = await cart.getCartItems();
            expect(items.length).toBe(1);

            await cart.proceedToCheckout();

            const checkout = new CheckoutPage(page);
            await checkout.fillCheckoutInfo(testData.firstName, testData.lastName, testData.postalCode);
            await checkout.finishOrder();

            const msg = await checkout.getSuccessMessage();
            expect(msg).toContain('Thank You');
        });
    });
});
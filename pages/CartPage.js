const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItem = '.cart_item';
    this.cartItemName = '.inventory_item_name';
    this.checkoutBtn = '[data-test="checkout"]';
    this.removeBtn = 'button[data-test^="remove"]';
  }

  async getCartItems() {
    await this.waitFor(this.cartItem);
    return await this.page.$$eval(this.cartItemName, els => els.map(e => e.textContent.trim()));
  }

  async removeFirstItem() {
    await this.click(this.removeBtn);
  }

  async proceedToCheckout() {
    await this.click(this.checkoutBtn);
  }
}

module.exports = CartPage;

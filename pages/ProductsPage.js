const BasePage = require('./BasePage');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryItem = '.inventory_item';
    this.inventoryItemName = '.inventory_item_name';
    this.addToCartBtn = 'button[data-test^="add-to-cart"]';
    this.cartIcon = '.shopping_cart_link';
    this.cartBadge = '.shopping_cart_badge';
  }

  async getAllProductNames() {
    await this.waitFor(this.inventoryItemName);
    return await this.page.$$eval(this.inventoryItemName, els => els.map(e => e.textContent.trim()));
  }

  async addFirstProductToCart() {
    await this.click(this.addToCartBtn);
  }

  async goToCart() {
    await this.click(this.cartIcon);
  }

  async getCartCount() {
    const badge = await this.page.locator(this.cartBadge);
    if (await badge.count() === 0) return 0;
    return parseInt(await badge.textContent());
  }
}

module.exports = ProductsPage;

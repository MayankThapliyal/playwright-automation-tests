const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = '[data-test="firstName"]';
    this.lastName = '[data-test="lastName"]';
    this.postalCode = '[data-test="postalCode"]';
    this.continueBtn = '[data-test="continue"]';
    this.finishBtn = '[data-test="finish"]';
    this.completeHeader = '.complete-header';
  }

  async fillCheckoutInfo(first, last, zip) {
    await this.type(this.firstName, first);
    await this.type(this.lastName, last);
    await this.type(this.postalCode, zip);
    await this.click(this.continueBtn);
  }

  async finishOrder() {
    await this.click(this.finishBtn);
  }

  async getSuccessMessage() {
    return await this.getText(this.completeHeader);
  }
}

module.exports = CheckoutPage;

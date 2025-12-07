// class BasePage{
//     constructor(page){
//         this.page = page;
//     }

//     async click(selector){
//         await this.page.click(selector);
//     }

//     async type(selector, text){
//         await this.page.fill(selector,text);
//     }

//     async getText(selector){
//         await this.page.textContent(selector);
//     }

//     async waitFor(selector){
//         await this.page.waitForSelector(selector);
//     }
// }

// export default BasePage;

// pages/BasePage.js
class BasePage {
  constructor(page) {
    this.page = page;
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async type(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector); // <-- RETURN the text
  }

  async waitFor(selector) {
    await this.page.waitForSelector(selector);
  }
}

module.exports = BasePage;

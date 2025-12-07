// // import {BasePage} from 'pages';
// // import BasePage from './BasePage';
// const BasePage = require('./BasePage').default;

// class LoginPage extends BasePage{
//     constructor(page){
//         super(page);
//         this.usernameInput = '#user-name';
//         this.passwordInput = '#password';
//         this.loginBtn = '#login-button';
//         this.errorMsg = '[data-test=error]';
//     }

//     async gotoLogin(){
//         await this.page.goto('/');
//     }

//     async login(username, password){
//         await this.type(this.usernameInput,username);
//         await this.type(this.passwordInput,password);
//         await this.click(this.loginBtn);
//     }

//     async getErrorMessage(){
//         return await this.getText(this.errorMsg);
//     }
// }

// export default LoginPage;

// pages/LoginPage.js
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginBtn = '#login-button';
    this.errorMsg = '[data-test="error"]';
  }

  async gotoLogin() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginBtn);
  }

  async getErrorMessage() {
    return await this.getText(this.errorMsg);
  }
}

module.exports = LoginPage;

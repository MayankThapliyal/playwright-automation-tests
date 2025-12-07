# Playwright JavaScript Automation Framework

UI Automation Framework built using **Playwright (JavaScript)** with **Page Object Model (POM)**, **Allure Reporting**, and complete **end-to-end test coverage** for the *SauceDemo* application.

---

## 🚀 Features

* Playwright Test Runner
* JavaScript (CommonJS) project structure
* Page Object Model (POM)
* Parallel cross-browser execution (Chromium, Firefox, WebKit)
* End-to-end checkout flow automation
* Allure reporting
* Clean, modular, scalable design

---

## 📦 Tech Stack

* **Playwright** (JavaScript)
* **Node.js**
* **Allure Reporter**
* **CommonJS modules**
* **SauceDemo application**

---

## 📁 Project Structure

```
playwright-framework/
│── pages/
│   ├── BasePage.js
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
│
│── tests/
│   ├── login.spec.js
│   ├── products.spec.js
│   └── checkout.spec.js
│
│── utils/
│── fixtures/
│── playwright.config.js
│── package.json
│── README.md
```

---

## 🧪 Test Scenarios Covered

### ✔ Login Tests

* Valid login
* Invalid login

### ✔ Products Tests

* Load all products
* Add product to cart
* Verify cart count

### ✔ Checkout Flow

* Add product
* Navigate to cart
* Fill checkout information
* Complete order
* Verify success message

---

## ▶️ Running Tests

Install dependencies:

```
npm install
```

Run all tests:

```
npx playwright test
```

Run in a specific browser:

```
npx playwright test --project=chromium
```

---

## 📊 Allure Report

Generate and open report:

```
npx allure generate ./allure-results --clean
npx allure open
```

---

## 🌐 Cross-Browser Support

* Chromium
* Firefox
* WebKit

---

## 👨‍💻 Author

**Mayank Thapliyal** — QA Automation Engineer

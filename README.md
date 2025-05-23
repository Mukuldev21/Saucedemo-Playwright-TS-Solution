# 🧪 Saucedemo Playwright TypeScript Solution

An end-to-end test automation framework for [saucedemo.com](https://www.saucedemo.com), built with [Playwright](https://playwright.dev/) and TypeScript. This project follows the Page Object Model (POM) design pattern to ensure maintainability and scalability.

![Playwright](https://img.shields.io/badge/Playwright-1.52.0-green?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🚀 Features

- **Cross-browser Testing**: Run tests on Chromium, Firefox, and WebKit.
- **Page Object Model (POM)**: Encapsulate page interactions for reusability.
- **Fixtures & Test Data**: Manage test data separately for clarity.
- **Utilities**: Common utility functions to support test execution.
- **CI/CD Ready**: Pre-configured GitHub Actions workflows for automated testing.

---

## 🛠️ Technologies Used

- **[Playwright](https://playwright.dev/)**: Node.js library for browser automation.
- **[TypeScript](https://www.typescriptlang.org/)**: Typed superset of JavaScript for better code quality.
- **[Node.js](https://nodejs.org/)**: JavaScript runtime environment.
- **[npm](https://www.npmjs.com/)**: Package manager for Node.js.
- **[GitHub Actions](https://github.com/features/actions)**: CI/CD workflows for automated testing.

---

## 📁 Project Structure

```
Saucedemo-Playwright-TS-Solution/
├── .github/
│   └── workflows/            # CI/CD workflows
├── fixtures/                 # Test data and fixtures
├── pages/                    # Page Object Models
├── tests/                    # Test specifications
├── tests-examples/           # Sample test cases
├── utils/                    # Utility functions
├── .gitignore                # Git ignore file
├── package.json              # Project metadata and dependencies
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

---

## ⚙️ Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Mukuldev21/Saucedemo-Playwright-TS-Solution.git
   cd Saucedemo-Playwright-TS-Solution
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright Browsers**

   ```bash
   npx playwright install
   ```

---

## ▶️ Running Tests

- **Run All Tests**
  ```bash
  npx playwright test
  ```

- **Run Specific Test File**
  ```bash
  npx playwright test tests/your-test-file.spec.ts
  ```

- **View Test Report**
  ```bash
  npx playwright show-report
  ```

---

## 📦 Fixtures & Test Data

The `fixtures/` directory contains JSON files and other resources used for test data. This separation ensures that test logic remains clean and data-driven.

---

## 🧩 Utilities

Common utility functions are housed in the `utils/` directory. These functions support various test operations, such as data manipulation, custom assertions, and more.

---

## 🔄 Continuous Integration

GitHub Actions workflows are defined in `.github/workflows/`. These workflows automate the testing process on every push or pull request, ensuring code quality and reliability.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

For more information, visit the [official repository](https://github.com/Mukuldev21/Saucedemo-Playwright-TS-Solution).

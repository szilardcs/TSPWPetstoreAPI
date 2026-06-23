### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
npx playwright install
```

### Run Tests
```bash
# Run all tests
npx playwright test

# Run with HTML report
npx playwright test --reporter=html

# Run with Allure report
npx playwright test
npx allure generate allure-results --clean
npx allure open allure-report
```

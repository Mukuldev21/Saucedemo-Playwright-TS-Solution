import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { TEST_USERS } from '../fixtures/test-data';

test.describe('Login Page Tests', () => {
  test('Successful login with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
    
    // Verify redirect to inventory page
    expect(await inventoryPage.isLoaded()).toBeTruthy();
  });
  
  test('Failed login with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.login(TEST_USERS.locked.username, TEST_USERS.locked.password);
    
    // Verify error message is displayed
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Sorry, this user has been locked out');
  });
  
  test('Failed login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.login('invalid_user', 'invalid_password');
    
    // Verify error message is displayed
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Username and password do not match');
  });
  
  test('Login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.login('', TEST_USERS.standard.password);
    
    // Verify error message is displayed
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Username is required');
  });
  
  test('Login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.login(TEST_USERS.standard.username, '');
    
    // Verify error message is displayed
    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Password is required');
  });
});
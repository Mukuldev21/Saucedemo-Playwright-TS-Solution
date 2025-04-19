import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { TEST_USERS, TEST_ITEMS } from '../fixtures/test-data';

test.describe('Inventory Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
  });
  
  test('Verify inventory items are displayed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Verify inventory items count
    expect(await inventoryPage.getInventoryItemCount()).toBe(6);
  });
  
  test('Add item to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Add item to cart
    await inventoryPage.addItemToCart(TEST_ITEMS.backpack);
    
    // Verify cart count
    expect(await inventoryPage.getCartItemCount()).toBe(1);
  });
  
  test('Remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Add item to cart
    await inventoryPage.addItemToCart(TEST_ITEMS.backpack);
    expect(await inventoryPage.getCartItemCount()).toBe(1);
    
    // Remove item from cart
    await inventoryPage.removeItemFromCart(TEST_ITEMS.backpack);
    expect(await inventoryPage.getCartItemCount()).toBe(0);
  });
  
  test('Add multiple items to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Add multiple items to cart
    await inventoryPage.addItemToCart(TEST_ITEMS.backpack);
    await inventoryPage.addItemToCart(TEST_ITEMS.bikeLight);
    await inventoryPage.addItemToCart(TEST_ITEMS.boltTShirt);
    
    // Verify cart count
    expect(await inventoryPage.getCartItemCount()).toBe(3);
  });
  
  test('Navigate to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    // Add item to cart
    await inventoryPage.addItemToCart(TEST_ITEMS.backpack);
    
    // Navigate to cart
    await inventoryPage.goToCart();
    
    // Verify cart page is loaded
    expect(await cartPage.isLoaded()).toBeTruthy();
  });
  
  test('Sort inventory items', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Sort items by name (A to Z)
    await inventoryPage.sortItems('az');
    
    // Sort items by name (Z to A)
    await inventoryPage.sortItems('za');
    
    // Sort items by price (low to high)
    await inventoryPage.sortItems('lohi');
    
    // Sort items by price (high to low)
    await inventoryPage.sortItems('hilo');
  });
  
  test('Logout from the application', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const loginPage = new LoginPage(page);
    
    // Logout
    await inventoryPage.logout();
    
    // Verify login page is loaded
    expect(await page.url()).toContain('/');
    expect(await loginPage.usernameInput.isVisible()).toBeTruthy();
  });
});

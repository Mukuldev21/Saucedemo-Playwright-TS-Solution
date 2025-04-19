import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { TEST_USERS, TEST_ITEMS, CHECKOUT_INFO } from '../fixtures/test-data';

test.describe('Checkout Process Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    
    // Login
    await loginPage.navigateToLoginPage();
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
    
    // Add item to cart
    await inventoryPage.addItemToCart(TEST_ITEMS.backpack);
    
    // Navigate to cart
    await inventoryPage.goToCart();
  });
  
  test('Complete checkout process', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    
    // Complete checkout
    await checkoutPage.completeCheckout();
    
    // Verify checkout is complete
    expect(await checkoutPage.isCheckoutComplete()).toBeTruthy();
    expect(await checkoutPage.getThankYouMessage()).toContain('Thank you');
  });
  
  test('Checkout with empty first name', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information with empty first name
    await checkoutPage.fillCheckoutInfo(
      '',
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    
    // Verify error message
    expect(await checkoutPage.getErrorMessage()).toContain('First Name is required');
  });
  
  test('Checkout with empty last name', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information with empty last name
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_INFO.firstName,
      '',
      CHECKOUT_INFO.postalCode
    );
    
    // Verify error message
    expect(await checkoutPage.getErrorMessage()).toContain('Last Name is required');
  });
  
  test('Checkout with empty postal code', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information with empty postal code
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      ''
    );
    
    // Verify error message
    expect(await checkoutPage.getErrorMessage()).toContain('Postal Code is required');
  });
  
  test('Verify checkout summary', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    
    // Verify item total
    const itemTotal = await checkoutPage.getItemTotal();
    expect(parseFloat(itemTotal)).toBeGreaterThan(0);
    
    // Verify tax
    const tax = await checkoutPage.getTax();
    expect(parseFloat(tax)).toBeGreaterThan(0);
    
    // Verify total
    const total = await checkoutPage.getTotal();
    expect(parseFloat(total)).toBeGreaterThan(0);
  });
  
  test('Return to home after checkout completion', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const inventoryPage = new InventoryPage(page);
    
    // Proceed to checkout
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.fillCheckoutInfo(
      CHECKOUT_INFO.firstName,
      CHECKOUT_INFO.lastName,
      CHECKOUT_INFO.postalCode
    );
    
    // Complete checkout
    await checkoutPage.completeCheckout();
    
    // Verify checkout is complete
    expect(await checkoutPage.isCheckoutComplete()).toBeTruthy();
    
    // Return to home
    await checkoutPage.returnToHome();
    
    // Verify inventory page is loaded
    expect(await inventoryPage.isLoaded()).toBeTruthy();
  });
});

import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  // Page elements
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  
  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Check if cart page is loaded
   * @returns true if cart page is loaded, false otherwise
   */
  async isLoaded(): Promise<boolean> {
    await this.waitForElement(this.pageTitle);
    const title = await this.getElementText(this.pageTitle);
    return title.includes('Your Cart');
  }

  /**
   * Get cart item count
   * @returns Cart item count
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Check if item exists in cart
   * @param itemName - Item name
   * @returns true if item exists in cart, false otherwise
   */
  async isItemInCart(itemName: string): Promise<boolean> {
    const item = this.cartItems.filter({ hasText: itemName });
    return await item.isVisible();
  }

  /**
   * Remove item from cart by name
   * @param itemName - Item name
   */
  async removeItem(itemName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: itemName });
    const removeButton = item.locator('.btn_secondary');
    await this.clickElement(removeButton);
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }

  /**
   * Continue shopping
   */
  async continueShopping(): Promise<void> {
    await this.clickElement(this.continueShoppingButton);
  }
}
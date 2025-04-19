import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  // Page elements
  readonly pageTitle: Locator;
  readonly inventoryContainer: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly cartButton: Locator;
  readonly sortDropdown: Locator;
  
  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
    this.inventoryContainer = page.locator('.inventory_container');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartButton = page.locator('.shopping_cart_link');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  /**
   * Check if inventory page is loaded
   * @returns true if inventory page is loaded, false otherwise
   */
  async isLoaded(): Promise<boolean> {
    await this.waitForElement(this.inventoryContainer);
    const title = await this.getElementText(this.pageTitle);
    return title.includes('Products');
  }

  /**
   * Get the number of inventory items
   * @returns Number of inventory items
   */
  async getInventoryItemCount(): Promise<number> {
    const items = this.page.locator('.inventory_item');
    return await items.count();
  }

  /**
   * Add item to cart by name
   * @param itemName - Item name
   */
  async addItemToCart(itemName: string): Promise<void> {
    const itemContainer = this.page.locator('.inventory_item').filter({ hasText: itemName });
    const addButton = itemContainer.locator('button').filter({ hasText: 'Add to cart' });
    await this.clickElement(addButton);
  }

  /**
   * Remove item from cart by name
   * @param itemName - Item name
   */
  async removeItemFromCart(itemName: string): Promise<void> {
    const itemContainer = this.page.locator('.inventory_item').filter({ hasText: itemName });
    const removeButton = itemContainer.locator('button').filter({ hasText: 'Remove' });
    await this.clickElement(removeButton);
  }

  /**
   * Get cart item count
   * @returns Cart item count
   */
  async getCartItemCount(): Promise<number> {
    const cartBadge = this.page.locator('.shopping_cart_badge');
    if (await cartBadge.isVisible()) {
      return parseInt(await cartBadge.textContent() || '0');
    }
    return 0;
  }

  /**
   * Navigate to cart
   */
  async goToCart(): Promise<void> {
    await this.clickElement(this.cartButton);
  }

  /**
   * Sort inventory items
   * @param sortOption - Sort option
   */
  async sortItems(sortOption: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.clickElement(this.sortDropdown);
    
    const optionMap = {
      'az': 'az',
      'za': 'za',
      'lohi': 'lohi',
      'hilo': 'hilo'
    };
    
    const option = this.page.locator(`[data-test="product_sort_container"] [value="${optionMap[sortOption]}"]`);
    await this.clickElement(option);
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    await this.clickElement(this.menuButton);
    await this.clickElement(this.logoutLink);
  }
}
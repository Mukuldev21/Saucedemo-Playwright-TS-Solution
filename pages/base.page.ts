import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseUrl: string = 'https://www.saucedemo.com';

  constructor(page: Page) {
    this.page = page;
  }

  //To Navigate to a specific URL 
  async navigate(path: string = ''): Promise<void> {
    await this.page.goto(`${this.baseUrl}/${path}`);
  }

  //To Wait for a specific element to be visible
   
  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
  }

  //To Get page title
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  //To Check if element exists
  async isElementVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }

  //To Get text from element
  async getElementText(locator: Locator): Promise<string> {
    await this.waitForElement(locator);
    return await locator.textContent() || '';
  }

  //To Click on element
  async clickElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.click();
  }

  //To Fill in text in an input field
  async fillInput(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.fill(text);
  }

  //To  Get the current URL
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}
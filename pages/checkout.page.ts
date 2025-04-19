import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  // Step One elements
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  
  // Step Two elements
  readonly checkoutSummary: Locator;
  readonly finishButton: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  
  // Completion elements
  readonly checkoutComplete: Locator;
  readonly thankYouHeader: Locator;
  readonly backHomeButton: Locator;
  
  constructor(page: Page) {
    super(page);
    
    // Step One elements
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    
    // Step Two elements
    this.checkoutSummary = page.locator('.checkout_summary_container');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemTotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    
    // Completion elements
    this.checkoutComplete = page.locator('#checkout_complete_container');
    this.thankYouHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Fill checkout information
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal code
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.postalCodeInput, postalCode);
    await this.clickElement(this.continueButton);
  }

  /**
   * Get error message text
   * @returns Error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }

  /**
   * Complete the checkout process
   */
  async completeCheckout(): Promise<void> {
    await this.clickElement(this.finishButton);
  }

  /**
   * Check if checkout is complete
   * @returns true if checkout is complete, false otherwise
   */
  async isCheckoutComplete(): Promise<boolean> {
    return await this.isElementVisible(this.checkoutComplete);
  }

  /**
   * Get thank you message
   * @returns Thank you message
   */
  async getThankYouMessage(): Promise<string> {
    return await this.getElementText(this.thankYouHeader);
  }

  /**
   * Return to home page
   */
  async returnToHome(): Promise<void> {
    await this.clickElement(this.backHomeButton);
  }

  /**
   * Get item total
   * @returns Item total
   */
  async getItemTotal(): Promise<string> {
    return (await this.getElementText(this.itemTotal)).replace('Item total: $', '');
  }

  /**
   * Get tax
   * @returns Tax
   */
  async getTax(): Promise<string> {
    return (await this.getElementText(this.tax)).replace('Tax: $', '');
  }

  /**
   * Get total
   * @returns Total
   */
  async getTotal(): Promise<string> {
    return (await this.getElementText(this.total)).replace('Total: $', '');
  }
}

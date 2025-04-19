import { Page } from '@playwright/test';

/**
 * Generate a random string
 * @param length - Length of the string
 * @returns Random string
 */
export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Take screenshot
 * @param page - Page object
 * @param name - Screenshot name
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `./screenshots/${name}-${Date.now()}.png` });
}

/**
 * Format price string to number
 * @param price - Price string
 * @returns Price as number
 */
export function formatPrice(price: string): number {
  return parseFloat(price.replace('$', ''));
}

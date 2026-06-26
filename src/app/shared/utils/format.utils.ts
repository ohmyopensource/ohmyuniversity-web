/**
 * Shared formatting utility functions.
 * Pure functions - no side effects, no Angular dependencies.
 */

/**
 * Formats a number as a Euro currency string using Italian locale.
 *
 * @param amount - The numeric amount to format.
 * @example formatAmount(1500) → '1.500,00 €'
 */
export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

/**
 * Shared UI utility functions for badge/variant mapping.
 * Pure functions - no side effects, no Angular dependencies.
 */

/**
 * Maps a course-type acronym to a badge variant.
 *
 * @param acronym - L | LM | LMcu | DOC
 */
export function acronymVariant(acronym: string): 'primary' | 'secondary' | 'tertiary' | 'success' {
  const map: Record<string, 'primary' | 'secondary' | 'tertiary' | 'success'> = {
    L: 'primary',
    LM: 'secondary',
    LMcu: 'tertiary',
    DOC: 'success',
  };
  return map[acronym] ?? 'primary';
}

/**
 * Returns the percentage of CFU earned over a total, rounded to the nearest integer.
 *
 * @param cfu   - CFU earned.
 * @param total - Total CFU required.
 */
export function cfuPercent(cfu: number, total: number): number {
  return Math.round((cfu / total) * 100);
}

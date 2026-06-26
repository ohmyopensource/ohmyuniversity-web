/**
 * Orientation UI utility functions for icon/variant CSS class mapping.
 * Used in all topic components that display colored icons with accordion behavior.
 * Pure functions - no side effects, no Angular dependencies.
 */

/**
 * Returns the background CSS class for an icon container
 * based on the design system variant and expanded state.
 */
export function getIconBgClass(variant: string, expanded: boolean): string {
  if (expanded) {
    const map: Record<string, string> = {
      primary: 'bg-blue-500',
      secondary: 'bg-purple-500',
      success: 'bg-green-500',
      warning: 'bg-amber-500',
      error: 'bg-red-500',
      info: 'bg-sky-500',
    };
    return map[variant] ?? 'bg-gray-500';
  }
  const map: Record<string, string> = {
    primary: 'bg-blue-50',
    secondary: 'bg-purple-50',
    success: 'bg-green-50',
    warning: 'bg-amber-50',
    error: 'bg-red-50',
    info: 'bg-sky-50',
  };
  return map[variant] ?? 'bg-gray-50';
}

/**
 * Returns the text color CSS class for an icon
 * based on the design system variant and expanded state.
 */
export function getIconColorClass(variant: string, expanded: boolean): string {
  if (expanded) return 'text-white';
  const map: Record<string, string> = {
    primary: 'text-blue-500',
    secondary: 'text-purple-500',
    success: 'text-green-500',
    warning: 'text-amber-500',
    error: 'text-red-500',
    info: 'text-sky-500',
  };
  return map[variant] ?? 'text-gray-500';
}

/**
 * Returns the text color CSS class for a label
 * when its accordion row is expanded.
 */
export function getLabelColorClass(variant: string): string {
  const map: Record<string, string> = {
    primary: 'text-blue-700',
    secondary: 'text-purple-700',
    success: 'text-green-700',
    warning: 'text-amber-700',
    error: 'text-red-700',
    info: 'text-sky-700',
  };
  return map[variant] ?? 'text-gray-700';
}

/**
 * Returns the border and background CSS classes for an expanded accordion panel
 * based on the design system variant.
 */
export function getVariantBorderClass(variant: string): string {
  const map: Record<string, string> = {
    primary: 'border-blue-100 bg-blue-50',
    secondary: 'border-purple-100 bg-purple-50',
    success: 'border-green-100 bg-green-50',
    warning: 'border-amber-100 bg-amber-50',
    error: 'border-red-100 bg-red-50',
    info: 'border-sky-100 bg-sky-50',
  };
  return map[variant] ?? 'border-gray-100 bg-gray-50';
}

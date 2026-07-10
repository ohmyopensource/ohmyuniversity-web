/** Minimal, dependency-free User-Agent parser: good enough for a friendly session label. */
export function parseUserAgent(userAgent: string): { browser: string; os: string } {
  if (!userAgent) return { browser: 'Dispositivo sconosciuto', os: '' };

  const browser = /Edg\//.test(userAgent)
    ? 'Edge'
    : /Chrome\//.test(userAgent)
      ? 'Chrome'
      : /Firefox\//.test(userAgent)
        ? 'Firefox'
        : /Safari\//.test(userAgent) && !/Chrome\//.test(userAgent)
          ? 'Safari'
          : 'Browser';

  const os = /Windows/.test(userAgent)
    ? 'Windows'
    : /Mac OS X/.test(userAgent)
      ? 'macOS'
      : /Android/.test(userAgent)
        ? 'Android'
        : /iPhone|iPad/.test(userAgent)
          ? 'iOS'
          : /Linux/.test(userAgent)
            ? 'Linux'
            : '';

  return { browser, os };
}

/** Human-readable session label, e.g. "Chrome su macOS" or just "Chrome" if OS is unknown. */
export function sessionDeviceLabel(userAgent: string): string {
  const { browser, os } = parseUserAgent(userAgent);
  return os ? `${browser} su ${os}` : browser;
}

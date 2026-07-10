/** A tracked OhMyUniversity session (device/IP metadata) */
export interface AuthSession {
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  lastUsedAt: string;
  current: boolean;
}

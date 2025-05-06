export function isValidClientIp(ip: string): boolean {
  if (!ip || ip === 'unknown') return false;
  if (ip.length > 100) return false;
  if (/[^0-9a-fA-F\.:, ]/.test(ip)) return false;
  return true;
}

export function isValidClientIp(ip: string): boolean {
  if (!ip || typeof ip !== 'string') return false;
  if (ip === 'unknown' || ip.length > 100) return false;
  const firstIp = ip.split(',')[0].trim();
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/;
  const isLocalhost = ['127.0.0.1', '::1'].includes(firstIp);
  return isLocalhost || ipv4Regex.test(firstIp) || ipv6Regex.test(firstIp);
}

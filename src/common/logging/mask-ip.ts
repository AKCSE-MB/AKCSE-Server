import { isIPv4, isIPv6 } from 'node:net';

export function maskIp(ip: string | undefined): string | undefined {
  if (!ip) {
    return undefined;
  }

  const v4 = ip.startsWith('::ffff:') ? ip.slice('::ffff:'.length) : ip;
  if (isIPv4(v4)) {
    return v4.replace(/\.\d+$/, '.xxx');
  }

  if (isIPv6(ip)) {
    const [head, tail] = ip.split('::');
    const headGroups = head ? head.split(':') : [];
    const tailGroups = tail ? tail.split(':') : [];
    const zeros = Array(8 - headGroups.length - tailGroups.length).fill('0');
    const groups =
      tail === undefined
        ? headGroups
        : [...headGroups, ...zeros, ...tailGroups];
    return `${groups.slice(0, 3).join(':')}::xxx`;
  }

  return 'unknown';
}

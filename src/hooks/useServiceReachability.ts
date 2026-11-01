import { useCallback, useEffect, useState } from 'react';
import type { Service } from '../services';

export type Reachability = 'checking' | 'responding' | 'unverified';
export type ReachabilityMap = Record<string, Reachability>;

const CHECK_INTERVAL_MS = 45_000;
const CHECK_TIMEOUT_MS = 4_000;

/**
 * A best-effort browser check, NOT a Docker health check.
 *
 * In no-cors mode the browser can detect a completed network request but
 * cannot inspect HTTP status codes (a 404/500 may still look "responding").
 * Browser security can also block requests to a perfectly healthy service.
 * Therefore we deliberately use "unverified", not "offline", on failure.
 */
export function useServiceReachability(services: Service[]) {
  const [statuses, setStatuses] = useState<ReachabilityMap>(() =>
    Object.fromEntries(services.map((service) => [service.id, 'checking']))
  );
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkAll = useCallback(async () => {
    setIsChecking(true);

    const results = await Promise.all(
      services.map(async (service): Promise<readonly [string, Reachability]> => {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), CHECK_TIMEOUT_MS);

        try {
          await fetch(service.url, {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-store',
            signal: controller.signal,
          });
          return [service.id, 'responding'] as const;
        } catch {
          // Offline, timed out, or blocked by browser security: indistinguishable here.
          return [service.id, 'unverified'] as const;
        } finally {
          window.clearTimeout(timeout);
        }
      })
    );

    setStatuses(Object.fromEntries(results));
    setLastChecked(new Date());
    setIsChecking(false);
  }, [services]);

  useEffect(() => {
    void checkAll();
    const interval = window.setInterval(() => void checkAll(), CHECK_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [checkAll]);

  return { statuses, lastChecked, isChecking, checkAll };
}

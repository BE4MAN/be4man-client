import { useMemo } from 'react';

export function useIsIOSSafari() {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    const isiOS =
      /iPad|iPhone|iPod/.test(ua) ||
      (/Macintosh/.test(ua) &&
        typeof document !== 'undefined' &&
        'ontouchend' in document);
    const isWebKit =
      typeof window !== 'undefined' && !!window.webkit && !('chrome' in window);

    return isiOS && isWebKit;
  }, []);
}

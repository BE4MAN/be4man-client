// 작성자 : 김민호
import { useEffect, useState } from 'react';

export default function useSystemTheme() {
  const [mode, setMode] = useState(
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => setMode(e.matches ? 'dark' : 'light');
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, []);

  return mode;
}

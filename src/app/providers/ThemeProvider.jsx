import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';

import { useUIStore } from '@/stores/uiStore';
import { globalStyles } from '@/styles/globalStyles';
import { dark, light } from '@/styles/theme';

export default function ThemeProvider({ children }) {
  const themePref = useUIStore((s) => s.theme);
  const theme = themePref === 'dark' ? dark : light;

  return (
    <EmotionThemeProvider theme={theme}>
      <Global styles={globalStyles(theme)} />
      {children}
    </EmotionThemeProvider>
  );
}

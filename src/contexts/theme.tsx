import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, Theme as NavTheme } from '@react-navigation/native';

type Mode = 'light'|'dark'|'system';
type Ctx = { mode: Mode; setMode(m:Mode): void; navTheme: NavTheme; };

const ThemeContext = createContext<Ctx>({} as any);

export function ThemeProviderCustom({ children }: {children: React.ReactNode}) {
  const [mode, setMode] = useState<Mode>('system');

  useEffect(() => { (async () => {
    const saved = await AsyncStorage.getItem('@theme-mode');
    if (saved) setMode(saved as Mode);
  })(); }, []);

  const setModePersist = async (m:Mode) => {
    setMode(m);
    await AsyncStorage.setItem('@theme-mode', m);
  };

  // simples: system = claro (pode integrar com useColorScheme depois)
  const navTheme = mode === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider value={{ mode, setMode: setModePersist, navTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useThemeCustom = () => useContext(ThemeContext);
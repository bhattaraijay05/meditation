import colors from '@constants/colors';
import {DARK, LIGHT} from '@constants/const';
import React, {createContext, useState} from 'react';
import {ColorSchemeName, StatusBar, useColorScheme} from 'react-native';

export const ThemeContext = createContext({
  theme: '' as ColorSchemeName,
  toggleTheme: () => {},
  settheme: (theme: ColorSchemeName) => {},
});

const ThemeContextProvider = (props: any) => {
  const darkMode = useColorScheme();
  const [theme, setTheme] = useState<ColorSchemeName>(darkMode);
  const toggleTheme = () => {
    theme === LIGHT ? setTheme(DARK) : setTheme(LIGHT);
  };

  const settheme = (theme: ColorSchemeName) => {
    setTheme(theme);
  };

  const bgColor = theme === LIGHT ? colors.lightTheme : colors.darkTheme;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, settheme}}>
      <StatusBar
        backgroundColor={bgColor}
        barStyle={theme === LIGHT ? 'dark-content' : 'light-content'}
      />
      <>{props.children}</>
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;

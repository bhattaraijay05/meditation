import {useContext} from 'react';
import colors from '../constants/colors';
import {ThemeContext} from '../context/ThemeContext';

const useStyle = () => {
  const {theme} = useContext(ThemeContext);
  return {
    color:
      theme === 'dark'
        ? {
            primary: colors.red,
            main: colors.darkTheme,
            textColor: colors.whiteText,
            distinct: colors.black,
            iconColor: colors.iconColorBlack,
            grey: colors.greyColor,
            inverse: colors.lightTheme,

            white: colors.white,

            downloadedColor: colors.downloadedColor,
          }
        : {
            primary: colors.blue,
            main: colors.lightTheme,
            textColor: colors.blackText,
            distinct: colors.white,
            iconColor: colors.iconColor,
            grey: colors.greyColor,
            inverse: colors.darkTheme,

            white: colors.white,
            downloadedColor: colors.downloadedColor,
          },
  };
};

export default useStyle;

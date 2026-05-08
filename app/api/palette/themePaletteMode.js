import lightPalette from './lightPalette';
import darkPalette from './darkPalette';

const themePalette = (color, mode) => {
  if (mode === 'dark') {
    return darkPalette["purpleRedTheme"];
  }
  return lightPalette["purpleRedTheme"];
};

export default themePalette;

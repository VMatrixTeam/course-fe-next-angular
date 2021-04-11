function getColorGenerator(varName) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${varName}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(${varName}), var(${opacityVariable}, 1))`;
    }
    return `rgb(var(${varName}))`;
  };
}

module.exports = {
  prefix: '',
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./apps/**/*.{html,ts}', './libs/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: getColorGenerator('--primary-color-rgb'),
      'primary-900': getColorGenerator('--primary-color-900-rgb'),
      'primary-800': getColorGenerator('--primary-color-800-rgb'),
      'primary-700': getColorGenerator('--primary-color-700-rgb'),
      'primary-600': getColorGenerator('--primary-color-600-rgb'),
      'primary-500': getColorGenerator('--primary-color-500-rgb'),
      'primary-400': getColorGenerator('--primary-color-400-rgb'),
      'primary-300': getColorGenerator('--primary-color-300-rgb'),
      'primary-200': getColorGenerator('--primary-color-200-rgb'),
      'primary-100': getColorGenerator('--primary-color-100-rgb'),
      'surface-a': getColorGenerator('--surface-a-rgb'),
      'surface-b': getColorGenerator('--surface-b-rgb'),
      'surface-c': getColorGenerator('--surface-c-rgb'),
      'surface-d': getColorGenerator('--surface-d-rgb'),
      'surface-e': getColorGenerator('--surface-e-rgb'),
      'surface-f': getColorGenerator('--surface-f-rgb'),
      'primary-text': getColorGenerator('--primary-color-text-rgb')
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};

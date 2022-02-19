const withOpacity = (variableName) => {
  return ({ opacityValue }) => {
    if(opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }

    return `rgb(var(${variableName}))`;
  };
};

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--primary'),
        'main-background': withOpacity('--main-background'),
        white: '#ffffff',
        secondary: withOpacity('--secondary'),
        shade: withOpacity('--shade'),
        accent: withOpacity('--accent'),
        'light-text': withOpacity('--light-text'),
        'accent-lighter': withOpacity('--accent-lighter'),
        'key-tuts-active': '#EA4C89',
        'key-tuts-passive': '#5c5c5c78',
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
      },
      transitionProperty: {
        bg: 'background-color',
      },
      transitionTimingFunction: {
        'out-sine': 'cubic-bezier(0.61, 1, 0.88, 1)',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
};

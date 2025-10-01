import { createTheme, ThemeOptions } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: '#FF0000',
        light: '#FF3333',
        dark: '#CC0000',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: mode === 'dark' ? '#AAAAAA' : '#606060',
      },
      background: {
        default: mode === 'dark' ? '#0F0F0F' : '#F9F9F9',
        paper: mode === 'dark' ? '#212121' : '#FFFFFF',
      },
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : '#0F0F0F',
        secondary: mode === 'dark' ? '#AAAAAA' : '#606060',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Arial", sans-serif',
      h1: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      body1: {
        fontSize: '0.875rem',
      },
      body2: {
        fontSize: '0.75rem',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '24px',
            fontWeight: 500,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            },
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

import { useState, useCallback } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';
import YouTubeIcon from '@mui/icons-material/YouTube';

interface AppBarComponentProps {
  onMenuClick: () => void;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  backgroundColor: alpha(theme.palette.common.white, 0.05),
  border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.08),
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.common.white, 0.08),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: '600px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.25, 1, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export const AppBarComponent = ({ onMenuClick }: AppBarComponentProps) => {
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, [searchQuery, navigate]);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            mr: { xs: 2, sm: 4 },
          }}
          onClick={handleLogoClick}
        >
          <YouTubeIcon sx={{ fontSize: 32, color: 'primary.main', mr: 0.5 }} />
          {!isMobile && (
            <Box sx={{ fontWeight: 500, fontSize: '1.25rem' }}>
              YouTube
            </Box>
          )}
        </Box>

        <Box 
          component="form" 
          onSubmit={handleSearch}
          sx={{ 
            flex: 1, 
            display: 'flex', 
            justifyContent: 'center',
            maxWidth: '600px',
          }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <Avatar 
          sx={{ 
            width: 32, 
            height: 32,
            bgcolor: 'primary.main',
            cursor: 'pointer',
          }}
        >
          U
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

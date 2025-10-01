import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { AppBarComponent } from './components/AppBarComponent';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Watch } from './pages/Watch';
import { Channel } from './pages/Channel';
import { Library } from './pages/Library';
import NotFound from './pages/NotFound';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <AppBarComponent onMenuClick={handleMenuClick} />
          
          <Sidebar 
            open={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            variant="temporary"
          />
          
          <Sidebar 
            open={true} 
            onClose={() => {}}
            variant="permanent"
          />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 8,
              // Rely on the permanent Drawer occupying width in the flex layout on md+.
              // Removing the hardcoded left margin prevents double offset and ensures
              // full-width content when the sidebar is hidden on small screens.
              ml: 0,
              minHeight: 'calc(100vh - 64px)',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watch/:videoId" element={<Watch />} />
              <Route path="/channel/:channelId" element={<Channel />} />
              <Route path="/library" element={<Library />} />
              <Route path="/trending" element={<Home />} />
              <Route path="/subscriptions" element={<Home />} />
              <Route path="/history" element={<Library />} />
              <Route path="/watch-later" element={<Library />} />
              <Route path="/liked" element={<Library />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

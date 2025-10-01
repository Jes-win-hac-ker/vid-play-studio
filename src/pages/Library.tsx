import { Box, Typography } from '@mui/material';
import { VideoCard } from '../components/VideoCard';
import { mockVideos } from '../api/mockData';

export const Library = () => {
  // In a real app, this would fetch from localStorage or backend
  const savedVideos = mockVideos.slice(0, 4);

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3, fontWeight: 500 }}>
        Library
      </Typography>

      <Typography variant="h3" sx={{ mb: 2, fontSize: '1.25rem' }}>
        Watch Later
      </Typography>
      {savedVideos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No videos saved to watch later
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 2,
            mb: 4,
          }}
        >
          {savedVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Box>
      )}

      <Typography variant="h3" sx={{ mb: 2, fontSize: '1.25rem' }}>
        Liked Videos
      </Typography>
      <Typography variant="body1" color="text.secondary">
        No liked videos yet
      </Typography>
    </Box>
  );
};

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { VideoCard } from '../components/VideoCard';
import { api } from '../api/youtube';
import { Video } from '../api/mockData';

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const data = await api.searchVideos(query);
        setVideos(data);
      } catch (error) {
        console.error('Error searching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3, fontWeight: 500 }}>
        Search results for "{query}"
      </Typography>
      {videos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No videos found matching your search.
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
          }}
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Box>
      )}
    </Box>
  );
};

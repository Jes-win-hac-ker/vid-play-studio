import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Button, Tabs, Tab, CircularProgress } from '@mui/material';
import { api, formatViews } from '../api/youtube';
import { Channel as ChannelType, Video } from '../api/mockData';
import { VideoCard } from '../components/VideoCard';

export const Channel = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!channelId) return;

      setLoading(true);
      try {
        const [channelData, videosData] = await Promise.all([
          api.getChannelById(channelId),
          api.getChannelVideos(channelId),
        ]);
        
        setChannel(channelData);
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching channel data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [channelId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!channel) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5">Channel not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          height: 200,
          backgroundImage: `url(${channel.banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 2,
          mb: 3,
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
        <Avatar src={channel.avatar} sx={{ width: 80, height: 80 }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h1" sx={{ mb: 0.5 }}>
            {channel.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formatViews(channel.subscribers)} subscribers • {channel.videoCount} videos
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {channel.description}
          </Typography>
        </Box>
        <Button variant="contained" size="large" sx={{ borderRadius: '24px' }}>
          Subscribe
        </Button>
      </Box>

      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Videos" />
        <Tab label="Shorts" />
        <Tab label="Playlists" />
        <Tab label="About" />
      </Tabs>

      {tabValue === 0 && (
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

      {tabValue === 1 && (
        <Typography variant="body1" color="text.secondary">
          No shorts available
        </Typography>
      )}

      {tabValue === 2 && (
        <Typography variant="body1" color="text.secondary">
          No playlists available
        </Typography>
      )}

      {tabValue === 3 && (
        <Box>
          <Typography variant="h2" sx={{ mb: 2 }}>About</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>{channel.description}</Typography>
          <Typography variant="body2" color="text.secondary">
            Joined: January 2020
          </Typography>
        </Box>
      )}
    </Box>
  );
};

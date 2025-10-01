import { Card, CardContent, CardMedia, Typography, Box, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Video } from '../api/mockData';
import { formatViews, formatPublishedDate } from '../api/youtube';

interface VideoCardProps {
  video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video.id}`);
  };

  const handleChannelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/channel/${video.channelId}`);
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={video.thumbnail}
          alt={video.title}
          sx={{ 
            aspectRatio: '16/9',
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            bgcolor: 'rgba(0,0,0,0.8)',
            color: 'white',
            px: 0.5,
            py: 0.25,
            borderRadius: 0.5,
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {video.duration}
        </Typography>
      </Box>
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Avatar 
            src={video.channelAvatar} 
            alt={video.channelTitle}
            onClick={handleChannelClick}
            sx={{ 
              width: 36, 
              height: 36,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.4,
              }}
            >
              {video.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              onClick={handleChannelClick}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: 'text.primary',
                },
              }}
            >
              {video.channelTitle}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatViews(video.views)} views • {formatPublishedDate(video.publishedAt)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

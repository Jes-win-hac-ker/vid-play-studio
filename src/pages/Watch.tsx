// YouTube Clone App - Watch Page Component
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Avatar, Button, Divider, TextField, CircularProgress, IconButton, Paper } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { api, formatViews, formatPublishedDate } from '../api/youtube';
import { Video, Comment } from '../api/mockData';
import { VideoCard } from '../components/VideoCard';

export const Watch = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!videoId) return;
      
      setLoading(true);
      try {
        const [videoData, related, commentsData] = await Promise.all([
          api.getVideoById(videoId),
          api.getRelatedVideos(videoId),
          api.getComments(videoId),
        ]);
        
        setVideo(videoData);
        setRelatedVideos(related);
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching video data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [videoId]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !videoId) return;

    try {
      const newComment = await api.addComment(videoId, commentText);
      setComments([newComment, ...comments]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!video) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h5">Video not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ position: 'relative', paddingTop: '56.25%', bgcolor: 'black', borderRadius: 2, overflow: 'hidden' }}>
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h1" sx={{ mb: 1 }}>
            {video.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src={video.channelAvatar} sx={{ width: 40, height: 40 }} />
              <Box>
                <Typography variant="body1" fontWeight={500}>
                  {video.channelTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  1.2M subscribers
                </Typography>
              </Box>
              <Button variant="contained" sx={{ ml: 2, borderRadius: '24px' }}>
                Subscribe
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button startIcon={<ThumbUpIcon />} variant="outlined" sx={{ borderRadius: '24px' }}>
                {formatViews(video.likes)}
              </Button>
              <Button startIcon={<ThumbDownIcon />} variant="outlined" sx={{ borderRadius: '24px' }}>
                Dislike
              </Button>
              <Button startIcon={<ShareIcon />} variant="outlined" sx={{ borderRadius: '24px' }}>
                Share
              </Button>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
          </Box>

          <Paper sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
            <Typography variant="body2" fontWeight={500}>
              {formatViews(video.views)} views • {formatPublishedDate(video.publishedAt)}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 1,
                whiteSpace: showFullDescription ? 'pre-wrap' : 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {showFullDescription ? video.description : video.description.slice(0, 150) + '...'}
            </Typography>
            <Button 
              size="small" 
              onClick={() => setShowFullDescription(!showFullDescription)}
              sx={{ mt: 1 }}
            >
              {showFullDescription ? 'Show less' : 'Show more'}
            </Button>
          </Paper>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              {comments.length} Comments
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Avatar sx={{ width: 40, height: 40 }}>U</Avatar>
              <Box sx={{ flex: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Add a comment..."
                  variant="standard"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  multiline
                />
                <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'flex-end' }}>
                  <Button onClick={() => setCommentText('')}>Cancel</Button>
                  <Button 
                    variant="contained" 
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                  >
                    Comment
                  </Button>
                </Box>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {comments.map((comment) => (
              <Box key={comment.id} sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Avatar src={comment.authorAvatar} sx={{ width: 40, height: 40 }} />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {comment.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatPublishedDate(comment.publishedAt)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {comment.content}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconButton size="small">
                      <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="caption">{comment.likes}</Typography>
                    <IconButton size="small">
                      <ThumbDownIcon fontSize="small" />
                    </IconButton>
                    <Button size="small">Reply</Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ width: { xs: '100%', lg: '400px' } }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Related Videos
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {relatedVideos.map((relatedVideo) => (
            <VideoCard key={relatedVideo.id} video={relatedVideo} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

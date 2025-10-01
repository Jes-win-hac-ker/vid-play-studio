import { mockVideos, mockChannels, mockComments, Video, Channel, Comment } from './mockData';

// This adapter can be easily switched to use real YouTube API
// by replacing the mock functions with actual API calls

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async searchVideos(query: string): Promise<Video[]> {
    await delay(500); // Simulate network delay
    if (!query) return mockVideos;
    
    return mockVideos.filter(video => 
      video.title.toLowerCase().includes(query.toLowerCase()) ||
      video.channelTitle.toLowerCase().includes(query.toLowerCase())
    );
  },

  async getTrendingVideos(): Promise<Video[]> {
    await delay(500);
    return mockVideos;
  },

  async getVideoById(id: string): Promise<Video | null> {
    await delay(300);
    return mockVideos.find(video => video.id === id) || null;
  },

  async getRelatedVideos(videoId: string): Promise<Video[]> {
    await delay(400);
    // Return all videos except the current one
    return mockVideos.filter(video => video.id !== videoId).slice(0, 10);
  },

  async getChannelById(id: string): Promise<Channel | null> {
    await delay(300);
    return mockChannels.find(channel => channel.id === id) || null;
  },

  async getChannelVideos(channelId: string): Promise<Video[]> {
    await delay(400);
    return mockVideos.filter(video => video.channelId === channelId);
  },

  async getComments(videoId: string): Promise<Comment[]> {
    await delay(300);
    return mockComments;
  },

  async addComment(videoId: string, content: string): Promise<Comment> {
    await delay(300);
    const newComment: Comment = {
      id: `cm${Date.now()}`,
      author: 'Current User',
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser`,
      content,
      likes: 0,
      publishedAt: new Date().toISOString(),
    };
    return newComment;
  },
};

// Utility functions
export const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

export const formatPublishedDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

export interface Video {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  channelAvatar: string;
  thumbnail: string;
  duration: string;
  views: number;
  publishedAt: string;
  description: string;
  likes: number;
  dislikes: number;
}

export interface Channel {
  id: string;
  title: string;
  avatar: string;
  banner: string;
  subscribers: number;
  description: string;
  videoCount: number;
}

export interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  likes: number;
  publishedAt: string;
}

const generateAvatar = (seed: string) => 
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;

export const mockVideos: Video[] = [
  {
    id: 'v1',
    title: 'Building a Modern Web Application with React and TypeScript',
    channelId: 'c1',
    channelTitle: 'Tech Academy',
    channelAvatar: generateAvatar('techacademy'),
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop',
    duration: '15:24',
    views: 125000,
    publishedAt: '2024-09-15T10:00:00Z',
    description: 'Learn how to build modern web applications using React and TypeScript. This comprehensive tutorial covers best practices, hooks, and component architecture.',
    likes: 8500,
    dislikes: 120,
  },
  {
    id: 'v2',
    title: 'Complete Guide to Material-UI v5 Components',
    channelId: 'c2',
    channelTitle: 'Design Masters',
    channelAvatar: generateAvatar('designmasters'),
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
    duration: '22:45',
    views: 89000,
    publishedAt: '2024-09-10T14:30:00Z',
    description: 'Deep dive into Material-UI v5 components, theming, and customization. Build beautiful UIs with this powerful React component library.',
    likes: 5200,
    dislikes: 85,
  },
  {
    id: 'v3',
    title: 'JavaScript ES6+ Features Every Developer Should Know',
    channelId: 'c1',
    channelTitle: 'Tech Academy',
    channelAvatar: generateAvatar('techacademy'),
    thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=225&fit=crop',
    duration: '18:30',
    views: 234000,
    publishedAt: '2024-09-05T09:15:00Z',
    description: 'Master modern JavaScript with ES6+ features including arrow functions, destructuring, async/await, and more.',
    likes: 12000,
    dislikes: 200,
  },
  {
    id: 'v4',
    title: 'CSS Grid vs Flexbox: When to Use What',
    channelId: 'c3',
    channelTitle: 'Frontend Weekly',
    channelAvatar: generateAvatar('frontendweekly'),
    thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400&h=225&fit=crop',
    duration: '12:18',
    views: 156000,
    publishedAt: '2024-09-01T16:45:00Z',
    description: 'Understanding the differences between CSS Grid and Flexbox, and when to use each layout system for responsive designs.',
    likes: 9800,
    dislikes: 150,
  },
  {
    id: 'v5',
    title: 'React Hooks Explained: useState, useEffect, and Custom Hooks',
    channelId: 'c2',
    channelTitle: 'Design Masters',
    channelAvatar: generateAvatar('designmasters'),
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop',
    duration: '25:10',
    views: 178000,
    publishedAt: '2024-08-28T11:00:00Z',
    description: 'Complete guide to React Hooks. Learn how to use built-in hooks and create your own custom hooks for reusable logic.',
    likes: 11500,
    dislikes: 180,
  },
  {
    id: 'v6',
    title: 'Web Performance Optimization Techniques',
    channelId: 'c3',
    channelTitle: 'Frontend Weekly',
    channelAvatar: generateAvatar('frontendweekly'),
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
    duration: '20:05',
    views: 92000,
    publishedAt: '2024-08-20T13:20:00Z',
    description: 'Learn essential web performance optimization techniques to make your websites faster and more efficient.',
    likes: 6700,
    dislikes: 95,
  },
  {
    id: 'v7',
    title: 'TypeScript Best Practices for React Developers',
    channelId: 'c1',
    channelTitle: 'Tech Academy',
    channelAvatar: generateAvatar('techacademy'),
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    duration: '17:42',
    views: 145000,
    publishedAt: '2024-08-15T10:30:00Z',
    description: 'Best practices for using TypeScript in React applications. Type safety, interfaces, generics, and more.',
    likes: 10200,
    dislikes: 140,
  },
  {
    id: 'v8',
    title: 'Responsive Design Principles and Mobile-First Approach',
    channelId: 'c2',
    channelTitle: 'Design Masters',
    channelAvatar: generateAvatar('designmasters'),
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop',
    duration: '14:55',
    views: 198000,
    publishedAt: '2024-08-10T15:00:00Z',
    description: 'Master responsive design principles and learn why mobile-first approach is essential for modern web development.',
    likes: 13400,
    dislikes: 165,
  },
];

export const mockChannels: Channel[] = [
  {
    id: 'c1',
    title: 'Tech Academy',
    avatar: generateAvatar('techacademy'),
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=300&fit=crop',
    subscribers: 1250000,
    description: 'Welcome to Tech Academy! We provide high-quality programming tutorials and tech reviews.',
    videoCount: 342,
  },
  {
    id: 'c2',
    title: 'Design Masters',
    avatar: generateAvatar('designmasters'),
    banner: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=300&fit=crop',
    subscribers: 890000,
    description: 'Learn web design, UI/UX principles, and modern design tools with Design Masters.',
    videoCount: 256,
  },
  {
    id: 'c3',
    title: 'Frontend Weekly',
    avatar: generateAvatar('frontendweekly'),
    banner: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=300&fit=crop',
    subscribers: 678000,
    description: 'Your weekly dose of frontend development tips, tricks, and best practices.',
    videoCount: 189,
  },
];

export const mockComments: Comment[] = [
  {
    id: 'cm1',
    author: 'John Developer',
    authorAvatar: generateAvatar('john'),
    content: 'Great tutorial! This really helped me understand the concepts better.',
    likes: 245,
    publishedAt: '2024-09-16T08:30:00Z',
  },
  {
    id: 'cm2',
    author: 'Sarah Designer',
    authorAvatar: generateAvatar('sarah'),
    content: 'The explanation was clear and concise. Would love to see more content like this!',
    likes: 189,
    publishedAt: '2024-09-16T10:15:00Z',
  },
  {
    id: 'cm3',
    author: 'Mike Coder',
    authorAvatar: generateAvatar('mike'),
    content: 'Could you cover more advanced topics in the next video? Thanks!',
    likes: 92,
    publishedAt: '2024-09-16T14:20:00Z',
  },
];

# YouTube Clone - Production Ready

A fully-featured YouTube clone built with React, TypeScript, and Material-UI v5. Features include video browsing, search, watch page with player, channel pages, comments, and responsive design.

![YouTube Clone](https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop)

## 🚀 Features

- **Video Browsing**: Grid view of trending videos with thumbnails, titles, channel info, views, and duration
- **Search**: Debounced search with query results
- **Watch Page**: Full video player with related videos, comments, likes, and channel info
- **Channel Pages**: Channel header, banner, subscriber count, and video list
- **Library**: Watch later and liked videos (localStorage persistence)
- **Responsive Design**: Mobile, tablet, and desktop breakpoints
- **Dark/Light Mode**: Theme toggle with persistent preference
- **Comments**: Add and view comments (mock implementation)
- **Clean Architecture**: Modular components, API adapter pattern, reusable hooks

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast development
- **Material-UI v5** for components and theming
- **React Router v6** for navigation
- **React Player** for video playback
- **Axios** for API calls
- **Emotion** for styled components

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd yt-clone

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🔑 API Setup (Optional)

This app works with mock data by default. To use real YouTube data:

1. Get a YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Copy `.env.example` to `.env`
3. Add your API key:
   ```
   VITE_YOUTUBE_API_KEY=your_actual_api_key
   ```
4. Modify `src/api/youtube.ts` to use the real API instead of mock data

### API Endpoints to Implement

- `search.list`: Search videos by query
- `videos.list`: Get video details by ID
- `channels.list`: Get channel information
- `commentThreads.list`: Get video comments

## 📁 Project Structure

```
src/
├── api/
│   ├── mockData.ts       # Mock video, channel, comment data
│   └── youtube.ts        # API adapter (mock/real API)
├── components/
│   ├── AppBarComponent.tsx  # Top navigation bar
│   ├── Sidebar.tsx          # Left navigation drawer
│   └── VideoCard.tsx        # Reusable video card
├── context/
│   └── ThemeContext.tsx     # Dark/light mode provider
├── pages/
│   ├── Home.tsx            # Trending videos grid
│   ├── Search.tsx          # Search results
│   ├── Watch.tsx           # Video player page
│   ├── Channel.tsx         # Channel page
│   └── Library.tsx         # Saved videos
├── theme/
│   └── theme.ts            # MUI theme configuration
├── App.tsx                 # Main app with routing
└── main.tsx               # Entry point
```

## 🎨 Design System

The app uses Material-UI's theming system with:

- **Primary Color**: YouTube Red (#FF0000)
- **Typography**: Roboto font family
- **Dark Mode**: Deep blacks (#0F0F0F, #212121)
- **Light Mode**: Clean whites and grays
- **Custom Components**: Rounded buttons, hover effects, smooth transitions

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard (if using real API)
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

### GitHub Pages

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_YOUTUBE_API_KEY` | YouTube Data API v3 key | No (uses mock data) |
| `VITE_API_FALLBACK_URL` | Mock server URL | No |

## 🔄 Switching from Mock to Real API

Edit `src/api/youtube.ts`:

```typescript
// Replace mock functions with real API calls
import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const api = {
  async searchVideos(query: string): Promise<Video[]> {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 20,
        key: API_KEY,
      },
    });
    // Transform response to match Video interface
    return transformVideos(response.data.items);
  },
  // ... implement other methods
};
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the component library
- [React Player](https://www.npmjs.com/package/react-player) for video playback
- YouTube for design inspiration
- [Unsplash](https://unsplash.com/) for placeholder images

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using React and Material-UI

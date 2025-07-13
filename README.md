# FluxPlay - Video Platform

About FluxPlay

FluxPlay is a cutting-edge video sharing platform that redefines the way creators and viewers connect. Built with modern web technologies and a focus on user experience, FluxPlay offers a seamless, YouTube-inspired interface with a unique dark aesthetic that's easy on the eyes.

### ✨ What Makes FluxPlay Special?

- **Fully Responsive**: Perfect experience across all devices - desktop, tablet, and mobile
- **Smart Search**: Find videos and creators instantly with real-time search functionality
- **Smooth Animations**: Every interaction feels natural with carefully crafted micro-animations
- **Secure**: Robust authentication system with session management and data protection
- **Lightning Fast**: Built with Vite for instant hot reloads and React 19 for optimal performance
- **Beautiful Dark Theme**: Immerse yourself in a sleek, gradient-rich dark interface that reduces eye strain and looks stunning

### 🚀 Key Highlights

| Feature                    | Description                                            |
| -------------------------- | ------------------------------------------------------ |
| **Video Upload**     | Drag-and-drop video uploads with custom thumbnails     |
| **User Profiles**    | Beautiful creator profiles with subscription system    |
| **Social Features**  | Like, comment, and subscribe to your favorite creators |
| **Playlists**        | Organize and share curated video collections           |
| **Watch History**    | Never lose track of videos you've watched              |
| **Real-time Search** | Find content instantly with smart search               |

## 🚀 Features

### Core Functionality

- **Video Upload & Streaming**: Upload videos with custom thumbnails and descriptions
- **User Authentication**: Secure login/register system with session management
- **Video Discovery**: Browse and search through uploaded videos
- **User Profiles**: View creator profiles with subscription functionality
- **Video Interaction**: Like videos, leave comments, and track view counts
- **Playlist Management**: Create and manage video playlists
- **Subscription System**: Subscribe to creators and manage subscriptions
- **Watch History**: Track your viewing history
- **Responsive Design**: Beautiful UI that works on all devices

## 🛠️ Tech Stack

### Frontend

- **React 19.1.0** - Modern React with latest features
- **Vite 7.0.0** - Fast build tool and development server
- **React Router DOM 7.6.3** - Client-side routing
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Context API** - State management for user authentication

## Features in Detail

### Authentication

- **Login**: Username/email and password authentication
- **Registration**: User account creation with validation
- **Session Management**: Automatic session persistence
- **Logout**: Secure session termination

### Video Management

- **Upload**: Multi-part form upload with progress tracking
- **Thumbnail Generation**: Automatic or custom thumbnail selection
- **Video Player**: Custom video player with controls
- **Edit**: Update video metadata and descriptions
- **Delete**: Remove videos with confirmation

### Social Features

- **Likes**: Like/unlike videos with real-time updates
- **Comments**: Add, view, and delete comments
- **Subscriptions**: Subscribe to creators
- **User Profiles**: View creator information and videos

### Content Discovery

- **Search**: Real-time search for videos and creators
- **Pagination**: Load more videos with infinite scroll
- **Categories**: Browse videos by different criteria
- **Recommendations**: Personalized video suggestions

## 🔒 Security Features

- **Session-based Authentication**: Secure cookie-based sessions
- **CORS Configuration**: Proper cross-origin request handling
- **Input Validation**: Client-side form validation
- **Error Handling**: Graceful error handling and user feedback

## 🌐 Live Demo

### Try FluxPlay Now!

Experience FluxPlay in action with our live demo: [fluxplayfrontend-5f27.vercel.app](https://fluxplayfrontend-5f27.vercel.app/)

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/fluxplay.git
   cd fluxplay
   ```
2. **Install dependencies**

   ```bash
   npm install
   ```
3. **Start development server**

   ```bash
   npm run dev
   ```
4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build the app for production             |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run ESLint to check code quality         |

## 🔧 Configuration

### Backend API

The application connects to a backend API hosted on Render:

- **Base URL**: `https://fluxplay-backend.onrender.com/api/v1`
- **Backend github link:** `https://github.com/salimshaddy18/FluxPlay-backend`
- **Authentication**: Cookie-based sessions
- **CORS**: Configured for cross-origin requests

### Environment Variables

No environment variables are currently required as the backend URL is hardcoded. For production, consider adding:

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_APP_NAME` - Application name

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 🆘 Support

For support and questions, please open an issue in the repository.

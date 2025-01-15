import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Banner from './components/Banner/Banner';
import CategorySection from './components/CategorySection/CategorySection';
import NewVideo from './components/NewVideo/NewVideo';
import { getVideos, createVideo, updateVideo, deleteVideo } from './services/api';
import './styles/index.css';

const Home = ({ videos, onDelete, onUpdate }) => {
  return (
    <>
      <Banner />
      <CategorySection 
        title="Front-end" 
        color="#2563eb" 
        videos={videos.filter(v => v.category === 'frontend')}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
      <CategorySection 
        title="Back-end" 
        color="#22c55e" 
        videos={videos.filter(v => v.category === 'backend')}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
      <CategorySection 
        title="Innovación y Gestión" 
        color="#a855f7" 
        videos={videos.filter(v => v.category === 'innovation')}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </>
  );
};

const VideoPlayer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const video = location.state?.video;

  useEffect(() => {
    if (!video) {
      navigate('/');
    }
  }, [video, navigate]);

  if (!video) return null;

  return (
    <div className="video-player-container">
      <h1>{video.title}</h1>
      {video.url && (
        <div className="video-wrapper">
          <iframe
            src={video.url}
            title={video.title}
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
      <p className="video-description">{video.description}</p>
    </div>
  );
};

const AppContent = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVideo = async (newVideo) => {
    try {
      const savedVideo = await createVideo(newVideo);
      setVideos([...videos, savedVideo]);
      navigate('/');
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await deleteVideo(videoId);
      setVideos(videos.filter(video => video.id !== videoId));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleUpdateVideo = async (updatedVideo) => {
    try {
      const savedVideo = await updateVideo(updatedVideo);
      setVideos(videos.map(video => 
        video.id === savedVideo.id ? savedVideo : video
      ));
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              videos={videos} 
              onDelete={handleDeleteVideo}
              onUpdate={handleUpdateVideo}
            />
          } 
        />
        <Route 
          path="/new-video" 
          element={<NewVideo onSubmit={handleAddVideo} />} 
        />
        <Route 
          path="/video/:id" 
          element={<VideoPlayer />} 
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
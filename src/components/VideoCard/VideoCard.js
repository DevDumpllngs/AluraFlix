import React from 'react';
import { motion } from 'framer-motion';
import { Play, Edit2, Trash2 } from 'lucide-react';
import EditModal from '../EditModal/EditModal';
import { useModal } from '../../hooks/useModal';
import './VideoCard.css';

const VideoCard = ({ video, onDelete, onUpdate }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(video.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    openModal();
  };

  const handleCardClick = () => {
    if (video?.videoUrl) {
      try {
        const url = new URL(video.videoUrl);
        if (url.hostname.includes('youtube.com') || url.hostname.includes('youtu.be')) {
          window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
        } else {
          console.warn('Invalid YouTube URL');
        }
      } catch (error) {
        console.error('Invalid URL format:', error);
      }
    }
  };

  return (
    <>
      <motion.div 
        className="video-card"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={handleCardClick}
      >
        <div className="video-thumbnail">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            loading="lazy"
          />
          <div className="video-overlay">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play size={48} color="white" />
            </motion.div>
          </div>
          {video.duration && (
            <span className="video-duration">{video.duration}</span>
          )}
        </div>
        <div className="video-info">
          <h3 className="video-title">{video.title}</h3>
          <p className="video-description">{video.description}</p>
          <div className="video-actions">
            <motion.button 
              className="btn btn-edit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEdit}
            >
              <Edit2 size={18} />
              Editar
            </motion.button>
            <motion.button 
              className="btn btn-delete"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
            >
              <Trash2 size={18} />
              Borrar
            </motion.button>
          </div>
        </div>
      </motion.div>

      <EditModal 
        isOpen={isOpen} 
        onClose={closeModal}
        video={video}
        onUpdate={(updatedVideo) => {
          onUpdate(updatedVideo);
          closeModal();
        }}
      />
    </>
  );
};

export default VideoCard;
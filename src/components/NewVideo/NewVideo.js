import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './NewVideo.css';

const NewVideo = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    thumbnail: '',
    videoUrl: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClear = () => {
    setFormData({
      title: '',
      category: '',
      thumbnail: '',
      videoUrl: '',
      description: ''
    });
  };

  return (
    <motion.div 
      className="new-video-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Nuevo Video</h1>
      
      <form onSubmit={handleSubmit} className="new-video-form">
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Ingrese el título"
            required
          />
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            required
          >
            <option value="">Seleccione una categoría</option>
            <option value="frontend">Front-end</option>
            <option value="backend">Back-end</option>
            <option value="innovation">Innovación y Gestión</option>
          </select>
        </div>

        <div className="form-group">
          <label>URL de la imagen</label>
          <input
            type="url"
            value={formData.thumbnail}
            onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
        </div>

        <div className="form-group">
          <label>URL del video</label>
          <input
            type="url"
            value={formData.videoUrl}
            onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
            placeholder="https://ejemplo.com/video.mp4"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Descripción del video"
            rows="4"
            required
          />
        </div>

        <div className="form-actions">
          <motion.button
            type="button"
            className="btn btn-clear"
            onClick={handleClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Limpiar
          </motion.button>
          <motion.button
            type="submit"
            className="btn btn-save"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Guardar
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewVideo;
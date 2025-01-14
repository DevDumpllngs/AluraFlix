import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Portal from '../common/Portal';
import './EditModal.css';

const EditModal = ({ isOpen, onClose, video, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    thumbnail: '',
    videoUrl: '',
    description: ''
  });

  useEffect(() => {
    if (video) {
      setFormData({
        ...video
      });
    }
  }, [video]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
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

  if (!isOpen) return null;

  return (
    <Portal>
      <AnimatePresence>
        <div className="modal-wrapper">
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-content"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="modal-header">
              <h2>Editar Video</h2>
              <button className="close-button" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ingrese el título"
                />
              </div>

              <div className="form-group">
                <label>Categoría</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                />
              </div>

              <div className="form-group">
                <label>URL del video</label>
                <input
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                  placeholder="https://ejemplo.com/video.mp4"
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Descripción del video"
                  rows="4"
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
        </div>
      </AnimatePresence>
    </Portal>
  );
};

export default EditModal;
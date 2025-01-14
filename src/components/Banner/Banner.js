import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import TypingEffect from './TypingEffect';
import './Banner.css';

const Banner = () => {

  const scrollToCategories = () => {
    const categoriesSection = document.querySelector('.category-section');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="banner">
      <div className="banner-container">
        <motion.div 
          className="banner-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="banner-title"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Bienvenido a <span className="highlight">AluraFlix</span>
          </motion.h1>
          <TypingEffect 
            text="Tu plataforma de aprendizaje en tecnología."
            speed={80}
            eraseSpeed={40}
            pauseTime={3000}
          />
          <motion.p 
            className="banner-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            ¡Código que Transforma Vidas! 🚀 Desbloquea tu Potencial con Alura Latam De Principiante a Desarrollador Profesional  
            Tu Futuro Tecnológico ¡Comienza Aquí!

          </motion.p>
          <motion.button 
            className="btn btn-primary btn-large"
            onClick={scrollToCategories}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Play size={24} />
            Comenzar
          </motion.button>
        </motion.div>
        <motion.div 
          className="banner-video"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="video-placeholder">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/ov7vA5HFe6w" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
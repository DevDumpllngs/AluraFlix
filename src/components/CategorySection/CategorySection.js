import React from 'react';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import VideoCard from '../VideoCard/VideoCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './CategorySection.css';

const CustomArrow = ({ direction, onClick }) => (
  <motion.button
    className={`carousel-arrow ${direction}-arrow`}
    onClick={onClick}
    whileHover={{ scale: 1.1, rotate: direction === 'prev' ? -5 : 5 }}
    whileTap={{ scale: 0.9 }}
  >
    {direction === 'prev' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
  </motion.button>
);

const CategorySection = ({ title, color, videos, onDelete, onUpdate }) => {
  const settings = {
    dots: true,
    infinite: videos.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <motion.section 
      className="category-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="category-container">
        <div className="category-header">
          <div className="category-title-wrapper">
            <motion.h2 
              className="category-title"
              style={{ color: color }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {title}
            </motion.h2>
          </div>
        </div>
        <div className="carousel-container">
          <Slider {...settings}>
            {videos.map((video, index) => (
              <motion.div 
                key={video.id} 
                className="carousel-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <VideoCard 
                  video={video} 
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </motion.section>
  );
};

export default CategorySection;
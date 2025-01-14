import React, { useEffect, useState } from 'react';

const TypingEffect = ({ text, speed = 100, eraseSpeed = 50, pauseTime = 2000 }) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout;
    
    if (!isDeleting && currentText.length < text.length) {
      // Escribiendo
      timeout = setTimeout(() => {
        setCurrentText(text.slice(0, currentText.length + 1));
      }, speed);
    } 
    else if (!isDeleting && currentText.length === text.length) {
      // Esperar antes de empezar a borrar
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } 
    else if (isDeleting && currentText.length > 0) {
      // Borrando
      timeout = setTimeout(() => {
        setCurrentText(text.slice(0, currentText.length - 1));
      }, eraseSpeed);
    } 
    else if (isDeleting && currentText.length === 0) {
      // Resetear para empezar de nuevo
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, text, speed, eraseSpeed, pauseTime]);

  return (
    <div className="typing-text">
      {currentText}
      <span className="cursor">|</span>
    </div>
  );
};

export default TypingEffect;
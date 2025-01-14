import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  
  return createPortal(
    children,
    document.getElementById('portal-root') || document.body
  );
};

export default Portal;
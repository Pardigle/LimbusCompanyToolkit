import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

const Backdrop = ({ children, onClose }) => {
  
  // 1. Styles
  const backdropStyles = {
    position: 'fixed',       // ← was 'absolute'; fixed anchors to the viewport
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.42)',
    zIndex: 1000,
    display: 'flex',
    pointerEvents: 'auto', // re-enable since portal-root has pointer-events: none
  };

  const contentContainerStyles = {
    pointerEvents: 'auto',
    display: 'flex',
    flexDirection: 'column',
  };

  // 2. Close on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // 3. Framer Motion Content
  const content = (
    <motion.div
      style={backdropStyles}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => onClose()}
    >
      <motion.div
        style={contentContainerStyles}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );

  // 4. Portal Logic
  const portalElement = document.getElementById('portal-root');

  return portalElement 
    ? ReactDOM.createPortal(content, portalElement) 
    : content;
};

export default Backdrop;
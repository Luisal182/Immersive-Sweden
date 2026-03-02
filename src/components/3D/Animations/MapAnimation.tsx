'use client';

import { motion } from 'framer-motion';

interface MapAnimationProps {
  children: React.ReactNode;
}

export const MapAnimation = ({ children }: MapAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.3, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'center' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
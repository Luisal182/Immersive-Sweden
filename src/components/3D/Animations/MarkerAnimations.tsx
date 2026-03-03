'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MarkerAnimationsProps {
  children: ReactNode;
}

export const MarkerAnimations = ({ children }: MarkerAnimationsProps) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};
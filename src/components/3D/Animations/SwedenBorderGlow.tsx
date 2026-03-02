'use client';

import { motion } from 'framer-motion';

export const SwedenBorderGlow = () => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {/* Inner glow - MÁS FUERTE */}
      <motion.div
        animate={{
          boxShadow: [
            'inset 0 0 40px rgba(79, 195, 255, 0.3)',
            'inset 0 0 80px rgba(79, 195, 255, 0.6)',
            'inset 0 0 40px rgba(79, 195, 255, 0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
        }}
      />

      {/* Edge glow - MÁS VISIBLE */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            '0 0 30px rgba(79, 195, 255, 0.6), inset 0 0 20px rgba(79, 195, 255, 0.2)',
            '0 0 60px rgba(79, 195, 255, 1), inset 0 0 40px rgba(79, 195, 255, 0.4)',
            '0 0 30px rgba(79, 195, 255, 0.6), inset 0 0 20px rgba(79, 195, 255, 0.2)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '2px solid rgba(79, 195, 255, 0.6)',
          borderRadius: '8px',
        }}
      />
    </motion.div>
  );
};
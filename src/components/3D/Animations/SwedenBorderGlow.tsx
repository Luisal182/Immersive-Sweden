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
      {/* Inner glow - suave con más intensidad */}
      <motion.div
        animate={{
          boxShadow: [
            'inset 0 0 30px rgba(79, 195, 255, 0.1)',
            'inset 0 0 50px rgba(79, 195, 255, 0.18)',
            'inset 0 0 30px rgba(79, 195, 255, 0.1)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
        }}
      />

      {/* Edge glow - más visible */}
      <motion.div
        animate={{
          opacity: [0.5, 0.8, 0.5],
          boxShadow: [
            '0 0 18px rgba(79, 195, 255, 0.25), inset 0 0 12px rgba(79, 195, 255, 0.08)',
            '0 0 32px rgba(79, 195, 255, 0.35), inset 0 0 20px rgba(79, 195, 255, 0.15)',
            '0 0 18px rgba(79, 195, 255, 0.25), inset 0 0 12px rgba(79, 195, 255, 0.08)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '1.5px solid rgba(79, 195, 255, 0.3)',
          borderRadius: '8px',
        }}
      />
    </motion.div>
  );
};
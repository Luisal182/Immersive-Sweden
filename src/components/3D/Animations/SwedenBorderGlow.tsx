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
      {/* Inner glow - suave */}
      <motion.div
        animate={{
          boxShadow: [
            'inset 0 0 20px rgba(79, 195, 255, 0.05)',
            'inset 0 0 40px rgba(79, 195, 255, 0.12)',
            'inset 0 0 20px rgba(79, 195, 255, 0.05)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
        }}
      />

      {/* Edge glow - decorativo */}
      <motion.div
        animate={{
          opacity: [0.4, 0.7, 0.4],
          boxShadow: [
            '0 0 12px rgba(79, 195, 255, 0.15), inset 0 0 8px rgba(79, 195, 255, 0.05)',
            '0 0 24px rgba(79, 195, 255, 0.25), inset 0 0 16px rgba(79, 195, 255, 0.1)',
            '0 0 12px rgba(79, 195, 255, 0.15), inset 0 0 8px rgba(79, 195, 255, 0.05)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: '1px solid rgba(79, 195, 255, 0.2)',
          borderRadius: '8px',
        }}
      />
    </motion.div>
  );
};
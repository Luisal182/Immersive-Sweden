import { motion, AnimatePresence } from 'framer-motion';
import { Organization } from '@/types';
import { useMapStore } from '@/store/mapStore';
import OrganizationCard from '@/components/Cards/OrganizationCard';
import styles from './Modal.module.css';

interface ModalProps {
  flyToOrganization?: (organization: Organization) => void;
}

export default function Modal({ flyToOrganization }: ModalProps) {
  const { isModalOpen, setModalOpen, getSelectedOrganization } = useMapStore();
  const selectedOrg = getSelectedOrganization();

  if (!isModalOpen || !selectedOrg) return null;

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
    {isModalOpen && selectedOrg && (
      <div
        className={`${styles.modal} ${styles.active}`}
        onClick={handleBackdropClick}
      >
        <div className={styles.backdrop} />
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, scale: 0.85, rotateX: 8, y: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, rotateX: 8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ perspective: 1000 }}
        >
          <OrganizationCard
            organization={selectedOrg}
            onClose={handleClose}
            flyToOrganization={flyToOrganization}
          />
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
}
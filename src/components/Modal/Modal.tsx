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
    <div 
      className={`${styles.modal} ${isModalOpen ? styles.active : ''}`}
      onClick={handleBackdropClick}
    >
      <div className={styles.backdrop}></div>
      <div className={styles.content}>
        <OrganizationCard 
          organization={selectedOrg}
          onClose={handleClose}
          flyToOrganization={flyToOrganization}
        />
      </div>
    </div>
  );
}
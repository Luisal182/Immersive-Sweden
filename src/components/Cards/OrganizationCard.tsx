'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Organization } from '@/types';
import styles from './OrganizationCard.module.css';
import { useMapStore } from '@/store/mapStore';

interface OrganizationCardProps {
  organization: Organization;
  onClose?: () => void;
  flyToOrganization?: (organization: Organization) => void;
}

export default function OrganizationCard({
  organization,
  onClose,
  flyToOrganization
}: OrganizationCardProps) {
  const { setIsMapCentered } = useMapStore();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  // Shadow that follows light source
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]: number[]) =>
     `${x}px ${y}px 20px rgba(0,0,0,0.6), 0 4px 16px rgba(0,0,0,0.5)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getBadgeColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      'XR': 'blue',
      'Visualization': 'purple',
      'AI': 'cyan',
      'Games': 'pink',
      'Culture': 'orange',
      'Technologies': 'green'
    };
    return colorMap[type] || 'gray';
  };

  const badgeColor = getBadgeColor(organization.type);

  const handleViewOnMap = () => {
    if (flyToOrganization) flyToOrganization(organization);
    setIsMapCentered(true);
    onClose?.();
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        boxShadow,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close card">
          ×
        </button>
      )}

      <div className={styles.header}>
        <span className={`${styles.badge} ${styles[`badge${badgeColor.charAt(0).toUpperCase() + badgeColor.slice(1)}`]}`}>
          {organization.type}
        </span>
      </div>

      <h2 className={styles.title}>{organization.name}</h2>

      <div className={styles.activityTag}>
        {organization.activity}
      </div>

      <p className={styles.description}>{organization.description}</p>

      <div className={styles.section}>
        <label className={styles.sectionLabel}>Location</label>
        <p className={styles.sectionValue}>{organization.location.city}</p>
      </div>

      <div className={styles.section}>
        <label className={styles.sectionLabel}>Contact</label>
        <a href={`mailto:${organization.contact.email}`} className={styles.contactLink}>
          {organization.contact.email}
        </a>
        <a href={`tel:${organization.contact.phone}`} className={styles.contactLink}>
          {organization.contact.phone}
        </a>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn}>Get in Touch</button>
        <button className={styles.secondaryBtn} onClick={handleViewOnMap}>
          View on Map
        </button>
      </div>
    </motion.div>
  );
}
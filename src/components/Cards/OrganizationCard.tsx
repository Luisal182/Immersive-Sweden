import { Organization } from '@/types';
import styles from './OrganizationCard.module.css';

interface OrganizationCardProps {
  organization: Organization;
  onClose?: () => void;
}

export default function OrganizationCard({
  organization,
  onClose
}: OrganizationCardProps) {
  
  // Dynamic color based on organization type
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

  return (
    <div className={styles.card}>
      {/* Close button */}
      {onClose && (
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Close card"
        >
          ×
        </button>
      )}

      {/* Header with badge */}
      <div className={styles.header}>
        <span className={`${styles.badge} ${styles[`badge${badgeColor.charAt(0).toUpperCase() + badgeColor.slice(1)}`]}`}>
          {organization.type}
        </span>
      </div>

      {/* Title */}
      <h2 className={styles.title}>{organization.name}</h2>

      {/* Activity Tag */}
      <div className={styles.activityTag}>
        {organization.activity}
      </div>

      {/* Description */}
      <p className={styles.description}>{organization.description}</p>

      {/* Location Section */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>Location</label>
        <p className={styles.sectionValue}>{organization.location.city}</p>
      </div>

      {/* Contact Section */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>Contact</label>
        
        <a 
          href={`mailto:${organization.contact.email}`}
          className={styles.contactLink}
        >
          {organization.contact.email}
        </a>
        
        <a 
          href={`tel:${organization.contact.phone}`}
          className={styles.contactLink}
        >
          {organization.contact.phone}
        </a>
      </div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.primaryBtn}>
          Get in Touch
        </button>
        <button className={styles.secondaryBtn}>
          View on Map
        </button>
      </div>
    </div>
  );
}
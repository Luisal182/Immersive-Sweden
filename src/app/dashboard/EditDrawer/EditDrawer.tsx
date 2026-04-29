'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './EditDrawer.module.css';

export interface OrgRow {
  id: number;
  name: string;
  city: string;
  type: string | null;
  activity: string | null;
  technology: string | null;
  industry: string | null;
  organization_model: string | null;
  organization_subtype: string | null;
  description: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  established: number | null;
  latitude: number | null;
  longitude: number | null;
}

interface EditDrawerProps {
  org: OrgRow;
  onClose: () => void;
  onSaved: (updated: OrgRow) => void;
}

export default function EditDrawer({ org, onClose, onSaved }: EditDrawerProps) {
  const [editOrg, setEditOrg] = useState<OrgRow>({ ...org });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');

    const { error } = await supabase
      .from('organizations')
      .update({
        name: editOrg.name,
        city: editOrg.city,
        type: editOrg.type,
        activity: editOrg.activity,
        technology: editOrg.technology,
        industry: editOrg.industry,
        organization_model: editOrg.organization_model,
        organization_subtype: editOrg.organization_subtype,
        description: editOrg.description,
        email: editOrg.email,
        phone: editOrg.phone,
        website: editOrg.website,
        established: editOrg.established,
        latitude: editOrg.latitude,
        longitude: editOrg.longitude,
      })
      .eq('id', editOrg.id);

    if (error) {
      setSaveMsg('error');
    } else {
      setSaveMsg('success');
      onSaved(editOrg);
      setTimeout(() => {
        setSaveMsg('');
        onClose();
      }, 1500);
    }
    setSaving(false);
  };

  const field = (label: string, key: keyof OrgRow, type = 'text') => (
    <div key={key} className={styles.fieldGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        value={(editOrg[key] ?? '') as string}
        onChange={e => setEditOrg(prev => ({
          ...prev,
          [key]: type === 'number'
            ? (e.target.value === '' ? null : Number(e.target.value))
            : e.target.value || null
        }))}
        className={styles.input}
      />
    </div>
  );

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Edit Organization</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Fields */}
        {field('Name', 'name')}
        {field('City', 'city')}
        {field('Type', 'type')}
        {field('Activity', 'activity')}
        {field('Technology', 'technology')}
        {field('Industry', 'industry')}
        {field('Organization Model', 'organization_model')}
        {field('Organization Subtype', 'organization_subtype')}
        {field('Established', 'established', 'number')}
        {field('Email', 'email')}
        {field('Phone', 'phone')}
        {field('Website', 'website')}
        {field('Latitude', 'latitude', 'number')}
        {field('Longitude', 'longitude', 'number')}

        {/* Description */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            value={editOrg.description ?? ''}
            onChange={e => setEditOrg(prev => ({ ...prev, description: e.target.value || null }))}
            rows={4}
            className={styles.textarea}
          />
        </div>

        {/* Save message */}
        {saveMsg && (
          <p className={saveMsg === 'success' ? styles.saveMsgSuccess : styles.saveMsgError}>
            {saveMsg === 'success' ? '✅ Saved successfully!' : '❌ Error saving. Try again.'}
          </p>
        )}

        {/* Buttons */}
        <div className={styles.buttons}>
          <button onClick={handleSave} disabled={saving} className={styles.saveBtn}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
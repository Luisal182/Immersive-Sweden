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
  mode?: 'edit' | 'create';
}

const TYPE_OPTIONS = ['XR', 'AI', 'Visualization', 'Games', 'Technologies'];
const ACTIVITY_OPTIONS = ['XR', 'AI', 'Visualization', 'Games', 'Technologies'];
const TECHNOLOGY_OPTIONS = ['XR', 'AI', 'Visualization', 'Games', 'Technologies'];
const INDUSTRY_OPTIONS = ['Healthcare', 'Culture', 'Manufacturing', 'Games'];
const MODEL_OPTIONS = ['Business', 'Nonprofit Organization'];
const SUBTYPE_OPTIONS = ['Civic Organization', 'Research Institute', 'University Lab'];

export default function EditDrawer({ org, onClose, onSaved, mode = 'edit' }: EditDrawerProps) {
  const [editOrg, setEditOrg] = useState<OrgRow>({ ...org });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');

    let error;

    if (mode === 'create') {
      const { error: insertError } = await supabase
        .from('organizations')
        .insert({
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
        });
      error = insertError;
    } else {
      const { error: updateError } = await supabase
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
      error = updateError;
    }

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

  const handleDelete = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', editOrg.id);

    if (error) {
      setSaveMsg('error');
    } else {
      onSaved({ ...editOrg, id: -1 });
      onClose();
    }
    setSaving(false);
  };

  // Text input field
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

  // Dropdown + text input field
  const selectField = (label: string, key: keyof OrgRow, options: string[]) => (
    <div key={key} className={styles.fieldGroup}>
      <label className={styles.label}>{label}</label>
      <select
        value={(editOrg[key] ?? '') as string}
        onChange={e => setEditOrg(prev => ({
          ...prev,
          [key]: e.target.value === '' ? null : e.target.value
        }))}
        className={styles.select}
      >
        <option value="">— None —</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Or type manually..."
        value={(editOrg[key] ?? '') as string}
        onChange={e => setEditOrg(prev => ({
          ...prev,
          [key]: e.target.value || null
        }))}
        className={styles.inputSmall}
      />
    </div>
  );

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {mode === 'create' ? 'Add Organization' : 'Edit Organization'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Fields */}
        {field('Name', 'name')}
        {field('City', 'city')}
        {selectField('Type', 'type', TYPE_OPTIONS)}
        {selectField('Activity', 'activity', ACTIVITY_OPTIONS)}
        {selectField('Technology', 'technology', TECHNOLOGY_OPTIONS)}
        {selectField('Industry', 'industry', INDUSTRY_OPTIONS)}
        {selectField('Organization Model', 'organization_model', MODEL_OPTIONS)}
        {selectField('Organization Subtype', 'organization_subtype', SUBTYPE_OPTIONS)}
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

        {/* Delete */}
        {mode !== 'create' && (
          <div className={styles.deleteSection}>
            {!confirmDelete ? (
              <button className={styles.deleteBtn} onClick={() => setConfirmDelete(true)}>
                🗑 Delete Organization
              </button>
            ) : (
              <div className={styles.confirmBox}>
                <p>Are you sure? This cannot be undone.</p>
                <div className={styles.buttons}>
                  <button className={styles.confirmDeleteBtn} onClick={handleDelete}>
                    Yes, delete
                  </button>
                  <button className={styles.cancelBtn} onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className={styles.buttons}>
          <button onClick={handleSave} disabled={saving} className={styles.saveBtn}>
            {saving ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
          </button>
          <button onClick={onClose} className={styles.cancelBtn}>Cancel</button>
        </div>
      </div>
    </>
  );
}
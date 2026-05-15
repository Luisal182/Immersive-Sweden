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
  previous_names: string | null;
  workplace_number: string | null;
  include: string | null;
  inclusion_justification: string | null;
  org_number: string | null;
  contact_person_description: string | null;
  area: string | null;
  category: string | null;
  customers_industry: string | null;
  system_role: string | null;
  capability_classification: string | null;
  customer_sector: string | null;
  active: string | null;
  age: number | null;
  size_category: string | null;
  closure: number | null;
  reason_for_closure: string | null;
  public_or_private: string | null;
  size_turnover: number | null;
  size_employees: number | null;
  company_type: string | null;
  business_model: string | null;
  collaboration_role: string | null;
  regulatory_orientation: string | null;
  innovation_maturity: string | null;
  cities_in_sweden: string | null;
  country_of_hq: string | null;
  geographical_ownership: string | null;
  vi_activity_ostergotland: string | null;
  founder_type: string | null;
  region_at_establishment: string | null;
  mother_university: string | null;
  mother_company: string | null;
  mother_public_org: string | null;
  mother_org_ostergotland: string | null;
  owner_type: string | null;
  group_or_consortia: string | null;
  notes_on_owner: string | null;
  merged_or_acquired: string | null;
  acquiring_owner: string | null;
  subsidiaries: string | null;
  own_acquisitions: string | null;
  funding: string | null;
  success_and_growth: string | null;
  connected_to_cluster: string | null;
  notes_on_partners: string | null;
  sources: string | null;
  type_of_organisation: string | null;
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
const YES_NO_OPTIONS = ['Yes', 'No'];
const ACTIVE_OPTIONS = ['Yes', 'No', 'Not active'];

export default function EditDrawer({ org, onClose, onSaved, mode = 'edit' }: EditDrawerProps) {
  const [editOrg, setEditOrg] = useState<OrgRow>({ ...org });
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const payload = {
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
    previous_names: editOrg.previous_names,
    workplace_number: editOrg.workplace_number,
    include: editOrg.include,
    inclusion_justification: editOrg.inclusion_justification,
    org_number: editOrg.org_number,
    contact_person_description: editOrg.contact_person_description,
    area: editOrg.area,
    category: editOrg.category,
    customers_industry: editOrg.customers_industry,
    system_role: editOrg.system_role,
    capability_classification: editOrg.capability_classification,
    customer_sector: editOrg.customer_sector,
    active: editOrg.active,
    age: editOrg.age,
    size_category: editOrg.size_category,
    closure: editOrg.closure,
    reason_for_closure: editOrg.reason_for_closure,
    public_or_private: editOrg.public_or_private,
    size_turnover: editOrg.size_turnover,
    size_employees: editOrg.size_employees,
    company_type: editOrg.company_type,
    business_model: editOrg.business_model,
    collaboration_role: editOrg.collaboration_role,
    regulatory_orientation: editOrg.regulatory_orientation,
    innovation_maturity: editOrg.innovation_maturity,
    cities_in_sweden: editOrg.cities_in_sweden,
    country_of_hq: editOrg.country_of_hq,
    geographical_ownership: editOrg.geographical_ownership,
    vi_activity_ostergotland: editOrg.vi_activity_ostergotland,
    founder_type: editOrg.founder_type,
    region_at_establishment: editOrg.region_at_establishment,
    mother_university: editOrg.mother_university,
    mother_company: editOrg.mother_company,
    mother_public_org: editOrg.mother_public_org,
    mother_org_ostergotland: editOrg.mother_org_ostergotland,
    owner_type: editOrg.owner_type,
    group_or_consortia: editOrg.group_or_consortia,
    notes_on_owner: editOrg.notes_on_owner,
    merged_or_acquired: editOrg.merged_or_acquired,
    acquiring_owner: editOrg.acquiring_owner,
    subsidiaries: editOrg.subsidiaries,
    own_acquisitions: editOrg.own_acquisitions,
    funding: editOrg.funding,
    success_and_growth: editOrg.success_and_growth,
    connected_to_cluster: editOrg.connected_to_cluster,
    notes_on_partners: editOrg.notes_on_partners,
    sources: editOrg.sources,
    type_of_organisation: editOrg.type_of_organisation,
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');

    let error;

    if (mode === 'create') {
      const { error: insertError } = await supabase
        .from('organizations')
        .insert(payload);
      error = insertError;
    } else {
      const { error: updateError } = await supabase
        .from('organizations')
        .update(payload)
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

        {/* ── BASIC INFO ── */}
        {field('Name', 'name')}
        {field('City', 'city')}
        {field('Cities in Sweden', 'cities_in_sweden')}
        {field('Org Number', 'org_number')}
        {field('Previous Names', 'previous_names')}
        {field('Workplace Number', 'workplace_number')}
        {selectField('Active', 'active', ACTIVE_OPTIONS)}
        {selectField('Include', 'include', YES_NO_OPTIONS)}
        {field('Inclusion Justification', 'inclusion_justification')}

        {/* ── CLASSIFICATION ── */}
        {selectField('Type', 'type', TYPE_OPTIONS)}
        {selectField('Type of Organisation', 'type_of_organisation', TYPE_OPTIONS)}
        {selectField('Activity', 'activity', ACTIVITY_OPTIONS)}
        {selectField('Technology', 'technology', TECHNOLOGY_OPTIONS)}
        {selectField('Industry', 'industry', INDUSTRY_OPTIONS)}
        {selectField('Organization Model', 'organization_model', MODEL_OPTIONS)}
        {selectField('Organization Subtype', 'organization_subtype', SUBTYPE_OPTIONS)}
        {field('Area', 'area')}
        {field('Category', 'category')}
        {field('System Role', 'system_role')}
        {field('Capability Classification', 'capability_classification')}
        {field('Business Model', 'business_model')}
        {field('Company Type', 'company_type')}
        {field('Public or Private', 'public_or_private')}
        {field('Customer Sector', 'customer_sector')}
        {field('Customers Industry', 'customers_industry')}
        {field('Innovation Maturity', 'innovation_maturity')}
        {field('Regulatory Orientation', 'regulatory_orientation')}
        {field('Collaboration Role', 'collaboration_role')}

        {/* ── SIZE & AGE ── */}
        {field('Established', 'established', 'number')}
        {field('Age', 'age', 'number')}
        {field('Size Category', 'size_category')}
        {field('Size Turnover', 'size_turnover', 'number')}
        {field('Size Employees', 'size_employees', 'number')}
        {field('Closure', 'closure', 'number')}
        {field('Reason for Closure', 'reason_for_closure')}

        {/* ── GEOGRAPHY ── */}
        {field('Country of HQ', 'country_of_hq')}
        {field('Geographical Ownership', 'geographical_ownership')}
        {field('Region at Establishment', 'region_at_establishment')}
        {field('VI Activity Östergötland', 'vi_activity_ostergotland')}

        {/* ── OWNERSHIP ── */}
        {field('Founder Type', 'founder_type')}
        {field('Owner Type', 'owner_type')}
        {field('Mother University', 'mother_university')}
        {field('Mother Company', 'mother_company')}
        {field('Mother Public Org', 'mother_public_org')}
        {selectField('Mother Org Östergötland', 'mother_org_ostergotland', YES_NO_OPTIONS)}
        {field('Group or Consortia', 'group_or_consortia')}
        {field('Notes on Owner', 'notes_on_owner')}

        {/* ── CORPORATE CHANGES ── */}
        {field('Merged or Acquired', 'merged_or_acquired')}
        {field('Acquiring Owner', 'acquiring_owner')}
        {field('Subsidiaries', 'subsidiaries')}
        {field('Own Acquisitions', 'own_acquisitions')}

        {/* ── CONTACT ── */}
        {field('Email', 'email')}
        {field('Phone', 'phone')}
        {field('Website', 'website')}
        {field('Contact Person Description', 'contact_person_description')}

        {/* ── LOCATION ── */}
        {field('Latitude', 'latitude', 'number')}
        {field('Longitude', 'longitude', 'number')}

        {/* ── NOTES & SOURCES ── */}
        {field('Funding', 'funding')}
        {field('Success and Growth', 'success_and_growth')}
        {field('Connected to Cluster', 'connected_to_cluster')}
        {field('Notes on Partners', 'notes_on_partners')}
        {field('Sources', 'sources')}

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
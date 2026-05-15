'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';
import EditDrawer, { OrgRow } from '@/app/dashboard/EditDrawer/EditDrawer';

export default function DashboardMain() {
  const router = useRouter();
  const [orgs, setOrgs] = useState<OrgRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editOrg, setEditOrg] = useState<OrgRow | null>(null);
  const [addOrg, setAddOrg] = useState(false);
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [showDropColumn, setShowDropColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState('');
  const [dropColumnName, setDropColumnName] = useState('');
  const [confirmDrop1, setConfirmDrop1] = useState(false);
  const [confirmDrop2, setConfirmDrop2] = useState(false);
  const [columnMsg, setColumnMsg] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (!auth) router.push('/dashboard');
    else fetchOrgs();
  }, [router]);

  const fetchOrgs = async () => {
    const { data, error, count } = await supabase
      .from('organizations')
      .select('*', { count: 'exact' })
      .order('id')
      .range(0, 999);

    console.log('Total en Supabase:', count);
    console.log('Cargadas:', data?.length);

    if (!error && data) setOrgs(data);
    setLoading(false);
  };

  const handleAddColumn = async () => {
    if (!newColumnName.trim()) return;
    const { error } = await supabase.rpc('add_column', { column_name: newColumnName.trim() });
    if (error) {
      setColumnMsg('❌ Error adding column: ' + error.message);
    } else {
      setColumnMsg('✅ Column added successfully!');
      setNewColumnName('');
      setShowAddColumn(false);
      setTimeout(() => setColumnMsg(''), 3000);
    }
  };

  const handleDropColumn = async () => {
    if (!dropColumnName.trim()) return;
    const { error } = await supabase.rpc('drop_column', { column_name: dropColumnName.trim() });
    if (error) {
      setColumnMsg('❌ Error dropping column: ' + error.message);
    } else {
      setColumnMsg('✅ Column deleted successfully!');
      setDropColumnName('');
      setShowDropColumn(false);
      setConfirmDrop1(false);
      setConfirmDrop2(false);
      setTimeout(() => setColumnMsg(''), 3000);
    }
  };

  const filtered = orgs.filter(org =>
    org.name.toLowerCase().includes(search.toLowerCase()) ||
    (org.city ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const emptyOrg: OrgRow = {
    id: 0, name: '', city: '', type: null, activity: null,
    technology: null, industry: null, organization_model: null,
    organization_subtype: null, description: null, email: null,
    phone: null, website: null, established: null,
    latitude: null, longitude: null,
    previous_names: null, workplace_number: null, include: null,
    inclusion_justification: null, org_number: null,
    contact_person_description: null, area: null, category: null,
    customers_industry: null, system_role: null,
    capability_classification: null, customer_sector: null,
    active: null, age: null, size_category: null, closure: null,
    reason_for_closure: null, public_or_private: null,
    size_turnover: null, size_employees: null, company_type: null,
    business_model: null, collaboration_role: null,
    regulatory_orientation: null, innovation_maturity: null,
    cities_in_sweden: null, country_of_hq: null,
    geographical_ownership: null, vi_activity_ostergotland: null,
    founder_type: null, region_at_establishment: null,
    mother_university: null, mother_company: null,
    mother_public_org: null, mother_org_ostergotland: null,
    owner_type: null, group_or_consortia: null, notes_on_owner: null,
    merged_or_acquired: null, acquiring_owner: null,
    subsidiaries: null, own_acquisitions: null, funding: null,
    success_and_growth: null, connected_to_cluster: null,
    notes_on_partners: null, sources: null, type_of_organisation: null,
  };

  return (
    <div className={styles.container}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>🌐 Admin Dashboard</h1>
        <div className={styles.headerActions}>
          <button className={styles.mapBtn} onClick={() => window.open('https://immersive-sweden.vercel.app/')}>
            🗺️ Go to Map
          </button>
          <button className={styles.logoutBtn} onClick={() => { sessionStorage.removeItem('admin_auth'); router.push('/dashboard'); }}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        Total organizations: <strong>{orgs.length}</strong>
      </div>

      {/* Search + Actions */}
      <div className={styles.searchRow}>
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addBtn} onClick={() => setAddOrg(true)}>
          + Add Organization
        </button>
        <button className={styles.addColumnBtn} onClick={() => { setShowAddColumn(true); setShowDropColumn(false); }}>
          + Add Column
        </button>
        <button className={styles.dropColumnBtn} onClick={() => { setShowDropColumn(true); setShowAddColumn(false); }}>
          🗑 Drop Column
        </button>
      </div>

      {/* Column message */}
      {columnMsg && (
        <p className={columnMsg.includes('✅') ? styles.successMsg : styles.errorMsg}>
          {columnMsg}
        </p>
      )}

      {/* Add Column Panel */}
      {showAddColumn && (
        <div className={styles.columnPanel}>
          <p className={styles.columnPanelTitle}>New column name (text, null by default):</p>
          <div className={styles.columnPanelRow}>
            <input
              type="text"
              value={newColumnName}
              onChange={e => setNewColumnName(e.target.value)}
              placeholder="e.g. new_field"
              className={styles.columnInput}
            />
            <button className={styles.addBtn} onClick={handleAddColumn}>Add</button>
            <button className={styles.cancelColumnBtn} onClick={() => setShowAddColumn(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Drop Column Panel */}
      {showDropColumn && (
        <div className={styles.columnPanelDanger}>
          <p className={styles.columnPanelTitle}>⚠️ Delete a column — this cannot be undone.</p>
          <div className={styles.columnPanelRow}>
            <input
              type="text"
              value={dropColumnName}
              onChange={e => { setDropColumnName(e.target.value); setConfirmDrop1(false); setConfirmDrop2(false); }}
              placeholder="Column name to delete"
              className={styles.columnInput}
            />
          </div>
          {dropColumnName && !confirmDrop1 && (
            <button className={styles.dropColumnBtn} onClick={() => setConfirmDrop1(true)}>
              Delete column "{dropColumnName}"
            </button>
          )}
          {confirmDrop1 && !confirmDrop2 && (
            <button className={styles.dropColumnBtn} onClick={() => setConfirmDrop2(true)}>
              ⚠️ Are you sure? This will delete all data in this column.
            </button>
          )}
          {confirmDrop2 && (
            <button className={styles.confirmDeleteBtn} onClick={handleDropColumn}>
              ✅ Yes, permanently delete column "{dropColumnName}"
            </button>
          )}
          <button className={styles.cancelColumnBtn} onClick={() => { setShowDropColumn(false); setConfirmDrop1(false); setConfirmDrop2(false); }}>
            Cancel
          </button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {['ID', 'Name', 'Description', 'City', 'Type', 'Technology', 'Industry', 'Model', 'Subtype', 'Established', 'Email', 'Phone', 'Website', 'Actions'].map(h => (
                  <th key={h} className={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(org => (
                <tr key={org.id} className={styles.tr}>
                  <td className={styles.td} title={String(org.id)}>{org.id}</td>
                  <td className={styles.td} title={org.name}>{org.name}</td>
                  <td className={styles.tdDescription} title={org.description ?? ''}>{org.description ?? '—'}</td>
                  <td className={styles.td} title={org.city}>{org.city}</td>
                  <td className={styles.td} title={org.type ?? ''}>{org.type ?? '—'}</td>
                  <td className={styles.td} title={org.technology ?? ''}>{org.technology ?? '—'}</td>
                  <td className={styles.td} title={org.industry ?? ''}>{org.industry ?? '—'}</td>
                  <td className={styles.td} title={org.organization_model ?? ''}>{org.organization_model ?? '—'}</td>
                  <td className={styles.td} title={org.organization_subtype ?? ''}>{org.organization_subtype ?? '—'}</td>
                  <td className={styles.td} title={String(org.established ?? '')}>{org.established ?? '—'}</td>
                  <td className={styles.td} title={org.email ?? ''}>{org.email ?? '—'}</td>
                  <td className={styles.td} title={org.phone ?? ''}>{org.phone ?? '—'}</td>
                  <td className={styles.tdWebsite} title={org.website ?? ''}>{org.website ?? '—'}</td>
                  <td className={styles.td}>
                    <button className={styles.editBtn} onClick={() => setEditOrg({ ...org })}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Drawer */}
      {editOrg && (
        <EditDrawer
          org={editOrg}
          onClose={() => setEditOrg(null)}
          onSaved={(updated) => {
            if (updated.id === -1) {
              setOrgs(prev => prev.filter(o => o.id !== editOrg!.id));
            } else {
              setOrgs(prev => prev.map(o => o.id === updated.id ? updated : o));
            }
            setEditOrg(null);
          }}
        />
      )}

      {/* Add Drawer */}
      {addOrg && (
        <EditDrawer
          mode="create"
          org={emptyOrg}
          onClose={() => setAddOrg(false)}
          onSaved={(newOrg) => {
            setOrgs(prev => [...prev, newOrg]);
            setAddOrg(false);
          }}
        />
      )}

    </div>
  );
}
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

  const filtered = orgs.filter(org =>
    org.name.toLowerCase().includes(search.toLowerCase()) ||
    (org.city ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>🌐 Admin Dashboard</h1>
        <button
          className={styles.logoutBtn}
          onClick={() => { sessionStorage.removeItem('admin_auth'); router.push('/dashboard'); }}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        Total organizations: <strong>{orgs.length}</strong>
      </div>

      {/* Search + Add */}
      <div className={styles.searchRow}>
     <input
    type="text"
    placeholder="Search by name or city..."
    value={search}
    onChange={e => setSearch(e.target.value)}
    className={styles.searchInput}
  />
  <button className={styles.addBtn} onClick={() => setAddOrg(true)}>
     Add Organization
  </button>
</div>

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
          org={{
            id: 0, name: '', city: '', type: null, activity: null,
            technology: null, industry: null, organization_model: null,
            organization_subtype: null, description: null, email: null,
            phone: null, website: null, established: null,
            latitude: null, longitude: null,
          }}
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
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
      .limit(1000);

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

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or city..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className={styles.searchInput}
      />

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
                  <td className={styles.td}>{org.id}</td>
                  <td className={styles.td}>{org.name}</td>
                  <td className={styles.tdDescription}>{org.description ?? '—'}</td>
                  <td className={styles.td}>{org.city}</td>
                  <td className={styles.td}>{org.type ?? '—'}</td>
                  <td className={styles.td}>{org.technology ?? '—'}</td>
                  <td className={styles.td}>{org.industry ?? '—'}</td>
                  <td className={styles.td}>{org.organization_model ?? '—'}</td>
                  <td className={styles.td}>{org.organization_subtype ?? '—'}</td>
                  <td className={styles.td}>{org.established ?? '—'}</td>
                  <td className={styles.td}>{org.email ?? '—'}</td>
                  <td className={styles.td}>{org.phone ?? '—'}</td>
                  <td className={styles.td}>{org.website ?? '—'}</td>
                  <td className={styles.td}>
                  <button className={styles.editBtn} onClick={() => setEditOrg({ ...org })}>Edit</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editOrg && (
  <EditDrawer
    org={editOrg}
    onClose={() => setEditOrg(null)}
    onSaved={(updated) => {
      setOrgs(prev => prev.map(o => o.id === updated.id ? updated : o));
      setEditOrg(null);
    }}
  />
)}
        </div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface OrgRow {
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

export default function DashboardMain() {
  const router = useRouter();
  const [orgs, setOrgs] = useState<OrgRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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
    <div style={{ minHeight: '100vh', background: '#0a1628', color: 'white', padding: '32px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#4fc3ff', fontSize: '24px' }}>🌐 Admin Dashboard</h1>
        <button
          onClick={() => { sessionStorage.removeItem('admin_auth'); router.push('/dashboard'); }}
          style={{ padding: '8px 16px', background: 'rgba(255,100,100,0.2)', color: '#ff6b6b', border: '1px solid #ff6b6b', borderRadius: '8px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      {/* Stats */}
      <div style={{ background: 'rgba(79,195,255,0.1)', border: '1px solid rgba(79,195,255,0.2)', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
        <p style={{ color: '#4fc3ff' }}>Total organizations: <strong>{orgs.length}</strong></p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or city..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '300px', padding: '10px 14px', marginBottom: '16px',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(79,195,255,0.3)',
          borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none',
        }}
      />

      {/* Table */}
      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading...</p>
      ) : (
        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 280px)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#0a1628', zIndex: 1 }}>
              <tr style={{ borderBottom: '1px solid rgba(79,195,255,0.3)' }}>
                {['ID', 'Name','Description', 'City', 'Type', 'Technology', 'Industry', 'Model', 'Subtype', 'Established', 'Email', 'Phone', 'Website', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#4fc3ff', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(org => (
                <tr key={org.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={td}>{org.id}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{org.name}</td>
                  <td style={{ ...td, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{org.description ?? '—'}</td>
                  <td style={td}>{org.city}</td>
                  <td style={td}>{org.type ?? '—'}</td>
                  <td style={td}>{org.technology ?? '—'}</td>
                  <td style={td}>{org.industry ?? '—'}</td>
                  <td style={td}>{org.organization_model ?? '—'}</td>
                  <td style={td}>{org.organization_subtype ?? '—'}</td>
                  <td style={td}>{org.established ?? '—'}</td>
                  <td style={td}>{org.email ?? '—'}</td>
                  <td style={td}>{org.phone ?? '—'}</td>
                  <td style={td}>{org.website ?? '—'}</td>
                  <td style={td}>
                    <button style={editBtn}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const td = { padding: '10px 12px', color: 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap' } as React.CSSProperties;
const editBtn = {
  padding: '4px 12px', background: 'rgba(79,195,255,0.2)',
  color: '#4fc3ff', border: '1px solid rgba(79,195,255,0.4)',
  borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
} as React.CSSProperties;
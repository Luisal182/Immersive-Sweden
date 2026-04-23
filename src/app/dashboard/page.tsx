'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      sessionStorage.setItem('admin_auth', 'true');
      router.push('/dashboard/main');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', background: '#0a1628',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.05)', padding: '40px',
        borderRadius: '12px', border: '1px solid rgba(79,195,255,0.2)',
        width: '360px', display: 'flex', flexDirection: 'column', gap: '16px',
      }}>
        <h1 style={{ color: '#4fc3ff', textAlign: 'center', marginBottom: '8px' }}>
          🌐 Admin Panel
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          style={inputStyle}
        />

        {error && <p style={{ color: '#ff6b6b', fontSize: '14px' }}>{error}</p>}

        <button onClick={handleLogin} style={btnStyle}>
          Login
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '12px', background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(79,195,255,0.3)', borderRadius: '8px',
  color: 'white', fontSize: '14px', outline: 'none',
} as React.CSSProperties;

const btnStyle = {
  padding: '12px', background: '#4fc3ff', color: '#0a1628',
  border: 'none', borderRadius: '8px', fontWeight: 'bold',
  fontSize: '14px', cursor: 'pointer',
} as React.CSSProperties;
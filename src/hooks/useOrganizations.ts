import { useState, useEffect } from 'react';
import { Organization } from '@/types';

interface UseOrganizationsReturn {
  organizations: Organization[];
  loading: boolean;
  error: string | null;
}

export const useOrganizations = (): UseOrganizationsReturn => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = require('@/data/organizations.json');
      setOrganizations(data.organizations);
      console.log(`✅ Loaded ${data.organizations.length} organizations`);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      console.error('❌ Error loading organizations:', message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { organizations, loading, error };
};
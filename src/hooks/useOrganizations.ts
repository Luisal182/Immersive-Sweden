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
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/organizations.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch organizations: ${response.status}`);
        }
        
        const data = await response.json();
        setOrganizations(data.organizations);
        console.log(`✅ Loaded ${data.organizations.length} organizations`);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        console.error('❌ Error loading organizations:', message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  return { organizations, loading, error };
};
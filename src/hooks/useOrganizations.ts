'use client';

import { useState, useEffect } from 'react';
import { Organization } from '@/types';
import { supabase } from '@/lib/supabase';

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
        const { data, error: supabaseError } = await supabase
          .from('organizations')
          .select('*')
          .limit(500);

        if (supabaseError) throw supabaseError;

        const mappedOrganizations: Organization[] = data.map((org: any) => ({
          id: org.id,
          name: org.name,
          description: org.description,
          type: org.type,
          activity: org.activity,
          technology: org.technology,
          industry: org.industry,
          organizationModel: org.organization_model,
          contact: {
            email: org.email,
            phone: org.phone,
          },
          location: {
            city: org.city,
            lat: org.latitude,
            lng: org.longitude,
          },
        }));

        setOrganizations(mappedOrganizations);
        console.log(`✅ Loaded ${mappedOrganizations.length} organizations from Supabase`);
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
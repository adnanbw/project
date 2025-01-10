import { useState, useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';

interface QueryState<T> {
  data: T | null;
  error: PostgrestError | null;
  loading: boolean;
}

export function useSupabaseQuery<T>(
  queryFn: () => Promise<T>,
  deps: any[] = []
) {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const data = await queryFn();
        if (isMounted) {
          setState({ data, error: null, loading: false });
        }
      } catch (error) {
        if (isMounted) {
          setState({ 
            data: null, 
            error: error as PostgrestError, 
            loading: false 
          });
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, deps);

  return state;
}
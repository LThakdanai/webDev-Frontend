import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [data, setData] = useState({
    runner: [],
    processData: [],
    productData: [],
    effStat: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle error messages

  const BASE = 'http://localhost:5431/api/';
  const userId = 1; // บังคับให้เป็น userId 1

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); // Reset any previous errors

      try {
        const [runnerRes, processDataRes, productDataRes, effStatRes] = await Promise.all([
          fetch(`${BASE}/runner/${userId}/`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${BASE}/process_data/${userId}/`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${BASE}/product_data/${userId}/`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${BASE}/eff_stat/${userId}/`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        // Check for any failed responses
        if (!runnerRes.ok || !processDataRes.ok || !productDataRes.ok || !effStatRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [runner, processData, productData, effStat] = await Promise.all([
          runnerRes.json(),
          processDataRes.json(),
          productDataRes.json(),
          effStatRes.json(),
        ]);

        setData({ runner, processData, productData, effStat });
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]); // Fetch data when the token changes

  return (
    <DataContext.Provider value={{ ...data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

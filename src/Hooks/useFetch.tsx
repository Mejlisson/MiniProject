import { useState, useEffect } from "react";

export default function useFetch(url: string, query: string, enabled: boolean = true) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim() || !enabled) return; // Om query är tom eller funktionen inte ska köras, gör inget

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        const result = await response.json();
            setData(result.docs || []); // API returnerar docs-arrayen
      } catch{
            setError("Kunde inte hämta data.");
      } finally {
            setLoading(false);
      }
    };

    fetchData();
  }, [url, query, enabled]);

  return { data, loading, error };
};
import { useState, useEffect } from "react";

export function useFetch<T>(
  url: string,
  query: string,
  enabled: boolean = true,
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim() || !enabled) return; // Om query är tom eller funktionen inte ska köras, gör inget

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.docs || []); // API returnerar docs-arrayen
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Kunde inte hämta data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Avbryt anrop vid avmontering eller ny sökning
  }, [url, query, enabled]);

  return { data, loading, error };
}

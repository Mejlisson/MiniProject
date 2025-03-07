import { useState, useEffect } from "react";
import { Book, ApiResponse, SearchParams } from "../API/types";

export function useFetchAPI<T>(
  endpoint: string,
  params: SearchParams = {},
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build queryParams
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        const response = await fetch(
          `https://openlibrary.org${endpoint}?${queryParams}`,
          { signal },
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        // Handle book search results
        const books = result.docs.map((book: any) => ({
          title: book.title,
          coverUrl: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : null,
        }));

        setData(books as T);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
}

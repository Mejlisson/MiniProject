import { useState, useEffect } from "react";
import { Book, Author, ApiResponse, SearchParams } from "../API/types";

export function useFetchAPI<T>(endpoint: string, params: SearchParams = {}): ApiResponse<T> {
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
        // Bygg upp queryParams
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        const response = await fetch(`https://openlibrary.org${endpoint}?${queryParams}`, { signal });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();

        // Hantera bok-sökning
        if (endpoint === "/search.json") {
            if (!result.docs || result.docs.length === 0) {
                throw new Error("Inga böcker hittades");
            }
          const booksWithCovers = result.docs.map((book: Book) => ({
            ...book,
            coverUrl: book.covers?.length
              ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
              : undefined,
          }));
          setData(booksWithCovers as T);
        }
        // Hantera författarsökning
        else if (endpoint.startsWith("/authors/")) {
          const authorWithCover = {
            ...result,
            coverUrl: result.photos?.length
              ? `https://covers.openlibrary.org/b/id/${result.photos[0]}-L.jpg`
              : undefined,
          };
          setData(authorWithCover as T);
        } 
        // Hantera övriga API-responser
        else {
          setData(result);
        }
      } catch (err) {
        if (!signal.aborted) setError(err as Error);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
}

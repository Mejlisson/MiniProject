import { useEffect, useMemo, useRef, useState } from "react";
import { useFetch } from "../../Hooks/useFetch";
import AuthorSearch from "./SearchAuthorList";
import SearchInput from "./SearchInput";  // Ny komponent för sökrutan
import SearchFilters from "./SearchFilters"; // Ny komponent för radio-knappar
import { Link } from "react-router-dom";

interface Book {
  title: string;
  cover_i?: number;
}

interface BookSearchProps {
  onSearch: (searching: boolean) => void;
}

export default function SearchFunction({ onSearch }: BookSearchProps) {
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<"title" | "author" | "q">("title");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const url = `https://openlibrary.org/search.json?${searchType}=${query}&limit=50`;
  const { data: books = [], loading, error } = useFetch(url, query, searchTriggered);

  const authorUrl = `https://openlibrary.org/search.json?author=${query}&limit=50`;
  const { data: authorData = [], loading: authorLoading, error: authorError } = useFetch(
    authorUrl,
    query,
    searchTriggered && searchType === "author"
  );

  const authors = useMemo(() => {
    if (searchType === "author" && Array.isArray(authorData)) {
      return Array.from(
        new Set(
          authorData
            .map((item: any) => item.author_name)
            .flat()
            .filter(Boolean)
            .filter((author: string) => author.toLowerCase().includes(query.toLowerCase()))
        )
      ).sort((a: string, b: string) => a.localeCompare(b));
    }
    return [];
  }, [authorData, searchType, query]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const searchBooks = () => {
    if (!query.trim()) {
      onSearch(false);
      return;
    }
    setSearchTriggered(true);
    onSearch(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* 🔹 Ny komponent för sökrutan */}
      <SearchInput query={query} setQuery={setQuery} searchBooks={searchBooks} inputRef={inputRef} />

      {/* 🔹 Ny komponent för radio-knappar */}
      <SearchFilters searchType={searchType} setSearchType={setSearchType} />

      {searchType === "author" ? (
        <AuthorSearch query={query} authors={authors} loading={authorLoading} error={authorError} />
      ) : (
        <div className="mt-6 w-full max-w-2xl">
          {loading ? (
            <p className="text-center text-green-800 animate-pulse">Loading...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : books.length > 0 ? (
            <ul className="grid grid-cols-4 sm:grid-cols-4 gap-6">
              {books.map((book: any, index: number) => (
                <li key={index} className="flex flex-col items-center w-40 h-65 bg-white p-4 shadow-md">
                <Link to={`/book/${book.title}`} className="text-center">
                  <img
                    src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "/MissingCover.png"}
                    alt={book.title}
                    className="w-40 h-65 object-cover mb-2 rounded-md"
                  />
                  <h2 className="text-gray-700 font-semibold">{book.title}</h2>
                </Link>
              </li>
              ))}
            </ul>
          ) : (
            searchTriggered &&
            query && <p className="flex justify-center items-center mt-4 text-red-600 animate-bounce">No search results</p>
          )}
        </div>
      )}
    </div>
  );
}

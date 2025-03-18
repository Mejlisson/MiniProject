import { useContext, useEffect, useMemo, useRef } from "react";
import { useFetch } from "../../Hooks/useFetch";
import AuthorSearch from "./SearchAuthorList";
import SearchInput from "./SearchInput";
import SearchFilters from "./SearchFilters";
import { MenuContext } from "../../context/menuContext";
import { SearchContext } from "../../context/searchContext";
import { Link } from "react-router-dom"; // 🔹 Importera Link för navigation

import "../../meny/style.css";

interface Book {
  key: string;
  title: string;
  cover_i?: number;
  author_name?: string[];
}

interface BookSearchProps {
  onSearch: (searching: boolean) => void;
}

export default function SearchFunction({ onSearch }: BookSearchProps) {
  const menuContext = useContext(MenuContext);
  const searchContext = useContext(SearchContext);

  if (!searchContext) {
    throw new Error("SearchContext must be used within a SearchProvider");
  }

  const {
    query,
    setQuery,
    searchType,
    setSearchType,
    searchTriggered,
    setSearchTriggered,
  } = searchContext;

  const setIsOpen = menuContext?.setIsOpen ?? (() => {});
  const inputRef = useRef<HTMLInputElement>(null);

  const bookUrl = `https://openlibrary.org/search.json?title=${query}&limit=50`;
  const authorUrl = `https://openlibrary.org/search.json?author=${query}&limit=50`;

  const { data: books, loading: bookLoading, error: bookError } = useFetch(
    bookUrl,
    query,
    searchTriggered && searchType === "title"
  );

  const { data: authorData, loading: authorLoading, error: authorError } = useFetch(
    authorUrl,
    query,
    searchTriggered && searchType === "author"
  );

  const authors = useMemo(() => {
    if (!Array.isArray(authorData)) return [];
    return [...new Set(authorData.map((item: any) => item.author_name).flat().filter(Boolean))]
      .sort((a, b) => a.localeCompare(b));
  }, [authorData, query]);
  

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const searchItems = () => {
    if (!query.trim()) {
      onSearch(false);
      return;
    }
    setSearchTriggered(true);
    onSearch(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
        <SearchInput query={query} setQuery={setQuery} searchBooks={searchItems} inputRef={inputRef} />
        <SearchFilters searchType={searchType} setSearchType={setSearchType} />

      <div className="mt-6 w-full max-w-2xl">
        {(bookLoading || authorLoading) && <p className="text-green-800 text-center animate-pulse">Loading...</p>}
        {bookError || authorError ? (
          <p className="text-red-600 text-center">{bookError || authorError}</p>
        ) : searchTriggered && query ? (
          searchType === "author" ? (
            <AuthorSearch query={query} authors={authors} loading={authorLoading} error={authorError} />
          ) : (
            books.length > 0 ? (
              <div>
                <h2 className="text-xl font-bold mb-4 text-center">Din Sök Resultat</h2>
                <ul className="grid grid-cols-4 sm:grid-cols-4 gap-6">
                  {books.map((book) => (
                    <li key={book.key} className="flex flex-col items-center w-40 h-65 bg-white p-4 shadow-md">
                      {/*Klickbar länk till bokdetaljer */}
                      <Link to={`/book/${book.key}`} className="text-center">
                        <img
                          src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "/MissingCover.png"}
                          alt={book.title}
                          className="w-50 h-40 object-contain mb-2"
                        />
                        <h2 className="text-gray-700 font-semibold text-center break-all">{book.title}</h2>
                      </Link>
                      {/*Klickbar länk till författarsida */}
                      {book.author_name && (
                        <Link to={`/author/${book.author_name[0]}`} className="text-blue-600 hover:underline mt-0"> {/* Här kommer man kunna klicka på */}
                          {book.author_name[0]}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="font-ravi flex justify-center items-center mt-4 text-red-600 animate-bounce">
                No search results
              </p>
            )
          )
        ) : null}
      </div>
    </div>
  );
}

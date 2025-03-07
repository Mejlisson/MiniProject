import React, { useState } from "react";
import { Book } from "../../API/types";
import { useFetchAPI } from "../../Hooks/useFetch";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const {
    data: results,
    loading,
    error,
  } = useFetchAPI<Book[]>("/search.json", { q: query });

  const handleSearch = () => {
    setQuery(query);
  };

  return (
    <div className="relative flex flex-col items-center w-full max-w-md mx-auto">
      <div className="flex items-center w-full border-md border-amber-600">
        <input
          type="text"
          placeholder="Search ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-12 py-3 rounded-full bg-white/80 backdrop-blur-md text-lg text-orange-700 placeholder-orange-700 shadow-sm shadow-amber-700 outline-transparent focus:ring-2 focus:ring-orange-600"
        />
        <button
          onClick={handleSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
        >
          <img src="/SearchIcon.png" alt="Search" className="w-10 h-9" />
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {results?.map((book, index) => (
          <li
            key={index}
            className="flex flex-col items-center w-40 bg-white p-4 rounded-lg shadow-md"
          >
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-50 h-40 object-contain mb-2"
              />
            )}
            <h2 className="text-center break-words">{book.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

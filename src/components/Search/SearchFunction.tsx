import { useEffect, useMemo, useRef, useState } from "react";
import { useFetch } from "../../Hooks/useFetch";
import AuthorSearch from "./SearchAuthorList";

interface Book {
  title: string;
  cover_i?: number;
}

interface BookSearchProps {// En callback-funktion för att kolla sökstatus
  onSearch: (searching: boolean) => void;
}

export default function SearchFunction({ onSearch }: BookSearchProps) {
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<"title" | "author" | "q">("title",); // Välja sökningstyp
  const [searchTriggered, setSearchTriggered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

   // Dynamisk URL beroende på söktyp
   const url = `https://openlibrary.org/search.json?${searchType}=${query}&limit=50`;

   // Hämta data från OpenLibrary API
   const { data: books = [], loading, error } = useFetch(url, query, searchTriggered);
 
   // Separat fetch för författarsökning
   const authorUrl = `https://openlibrary.org/search.json?author=${query}&limit=50`;
   const { data: authorData = [], loading: authorLoading, error: authorError } = useFetch(
     authorUrl,
     query,
     searchTriggered && searchType === "author"
   );
 
   // Bearbeta och sortera författardata
   const authors = useMemo(() => {
     if (searchType === "author" && Array.isArray(authorData)) {
       return Array.from(
         new Set(
          authorData
          .map((item: any) => item.author_name) //Hämtar alla författarnamn
          .flat() // Ser till att det är en platt array (inga nested arrays)
          .filter(Boolean) // Tar bort `null`, `undefined` eller tomma strängar
          .filter((author: string) => 
            author.toLowerCase().includes(query.toLowerCase()) // Filtrerar ut matchande författarnamn
          )
      )
    ).sort((a: string, b: string) => a.localeCompare(b)); // Sorterar i bokstavsordning
  }
  return [];
   }, [authorData, searchType, query]);
 
   // Focus på inputfältet vid render
   useEffect(() => {
     if (inputRef.current) {
       inputRef.current.focus();
     }
   }, []);
 
   // Hantera sökning
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
      {/* Sökfält för text input och backgrundsbild */}
      <div className="w-full flex justify-center items-center bg-[url('/MainImgGreen.png')] bg-cover bg-center bg-no-repeat h-[400px]">
        <div className="relative w-full max-w-lg">
          {/* Sökfält för text input */}
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchBooks()}
            ref={inputRef} // Attach the ref to the input element
            className="w-full py-3 pl-6 pr-14 text-lg text-gray-700 placeholder-gray-500 bg-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#75bcc0]"
          />
          <button
            onClick={searchBooks}
            className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <img src="/SearchIcon.png" alt="Search" className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* sökningsTYP/RadioButtons */}
      <div className="flex mt-4 space-x-4"> 
        {["title", "author", "q"].map((type) => (
          <label
            key={type}
            className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value={type}
              checked={searchType === type}
              onChange={() => setSearchType(type as "title" | "author" | "q")}
              className="w-5 h-5 text-blue-500 accent-blue-500"/>
            <span className="text-gray-700">
              {type === "title" ? "Search by Title" : type === "author" ? "Search by Author" : "Search General"}
            </span>
          </label>
        ))}
      </div>

      {/* om sökningstypen är "author" rendera AuthorSearch function */}
      {searchType === "author" ? (
        <AuthorSearch query={query} authors={authors} loading={authorLoading} error={authorError}/>
      ) : (
        <div className="mt-6 w-full max-w-2xl">
          {loading ? (
            <div className="flex justify-center items-center">
              <img src="/frog(2).gif"alt="Loading animation"className="w-30 h-30 mb-2"/>
              <p className="text-green-700 animate-pulse">Loading...</p>
            </div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : books.length > 0 ? (
            <ul className="grid grid-cols-4 sm:grid-cols-4 gap-6 gap-x-25">
              {books.map((book: any, index: number) => (
                <li key={index} className="flex flex-col items-center w-40 h-65 bg-white p-4 shadow-md">
                  <img src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                        : "/MissingCover.png"
                    }
                    alt={book.title} className="w-40 h-65 object-cover mb-2 rounded-md truncate"/>
                  <h2 className="text-center text-gray-700 font-semibold">
                    {book.title}
                  </h2>
                </li>
              ))}
            </ul>
          ) : (
            searchTriggered &&
            query && (
              <p className="flex justify-center items-center mt-4 text-red-600 animate-bounce">
                No search results
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}

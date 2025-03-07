import React, { useEffect, useRef, useState } from "react";
import { Book } from "../../API/types";

interface BookSearchProps {
  // En callback-funktion för att kolla sökstatus
  onSearch: (searching: boolean) => void;
}

export default function BookSearch({ onSearch }: BookSearchProps) {
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    if (inputRef.current) {
      console.log("Focusing input element");
      inputRef.current.focus();
    } else {
      console.log("Input element not found");
    }
  }, []);

  const fetchBooks = async () => {
    if (!query.trim()) {
      onSearch(false);
      return; // om sökfältet inte har aktiverats visas RandomBöcker
    }
    onSearch(true); // Sökning har aktiverats
    setLoading(true);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&limit=50`,
      );
      const data = await response.json();

      if (data.docs) {
        setBooks(
          data.docs.map((book: Book) => ({
            title: book.title,
            cover_i: book.cover_id,
          })),
        );
      }
    } catch (error) {
      console.error("Fel:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* sökfält-container med bakgrundsbild */}
      <div
        className="w-full flex justify-center py-12"
        style={{
          backgroundImage: "url('/MainImgGreen.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Sökfält */}
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchBooks()}
            ref={inputRef} // Attach the ref to the input element
            className="w-full py-3 pl-6 pr-14 text-lg text-gray-700 placeholder-gray-500 bg-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={fetchBooks}
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <img src="/SearchIcon.png" alt="Search" className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* sökresultat */}
      <div className="mt-6 w-full max-w-2xl">
        {loading && <div>Loading...</div>}
        {books.length > 0 ? (
          <ul className="grid grid-cols-4 sm:grid-cols-4 gap-6 gap-x-25">
            {books.map((book: any, index) => (
              <li
                key={index}
                className="flex flex-col items-center w-40 h-65 bg-white p-4 shadow-[0px_0px_4px_3px_rgba(195,186,171,0.3)]"
              >
                <img
                  src={
                    book.cover_i
                      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                      : "/Img/UnDefinedBook.png"
                  }
                  alt={book.title}
                  className="w-40 h-60 object-cover mb-2 rounded-md truncate"
                />
                <h2 className="text-center text-gray-700 font-semibold">
                  {book.title}
                </h2>
              </li>
            ))}
          </ul>
        ) : (
          query && <p className="mt-4 text-red-600">Inga böcker hittades</p>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { fetchRandomBooks } from "../../API/randomBooksApi";

const RandomBooksComponent: React.FC = () => {
  const [books, setBooks] = useState<
    { title: string; coverUrl: string | null }[]
  >([]);
  // state loading
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const books = await fetchRandomBooks();
      setBooks(books);
      setLoading(false);
      console.log("Number of books:", books.length);
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4 flex justify-center">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center space-x-30 justify-center pl-32">
          {books.map((book, index) => (
            <li
              key={index}
              className="flex flex-col items-center w-40 bg-white p-4 rounded-lg shadow-[0px_0px_4px_3px_rgba(195,186,171,0.3)]"
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
      )}
    </div>
  );
};

export default RandomBooksComponent;

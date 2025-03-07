import React from "react";
import useFetchBooks from "../../Hooks/useFetchBooksEffect";
import { Book } from "../../types/types";

const RandomBooksComponent: React.FC = () => {
  const { books, loading } = useFetchBooks();

  return (
    <div className="p-4 flex justify-center">
      {loading ? (
        <div className="flex justify-center items-center">
          <img
            src="/frog(2).gif"
            alt="Loading animation"
            className="w-50 h-50 mb-2"
          />
          <p className="text-green-700 animate-pulse ">Loading...</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center space-x-30 justify-center pl-32">
          {books.map((book, index) => (
            <li
              key={index}
              className="flex flex-col items-center w-40 h-65 bg-white p-4 shadow-[0px_0px_4px_3px_rgba(195,186,171,0.3)]"
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

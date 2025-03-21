import useFetchBooks from "../hooks/useFetchBooks";
import { useNavigate } from "react-router-dom";
import { Book } from "../types/types";

const RandomBooksWidget = () => {
  const { books, loading } = useFetchBooks();
  const navigate = useNavigate(); // Skapa en navigate-funktion

  const handleBookClick = (book: Book) => {
    if (!book.key?.startsWith("/works/")) {
      console.error("Invalid book key:", book.key);
      return;
    }

    const bookId = book.key.replace("/works/", "");
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="p-4 flex justify-center pr-35">
      {loading ? (
        <div className="flex justify-center items-center">
          <img
            src="/frog(2).gif"
            alt="Loading animation"
            className="w-50 h-50 mb-2"
          />
          <p className="text-green-700 animate-pulse">Loading...</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pl-32">
          {books.length === 0 ? (
            <p className="text-gray-500">Inga böcker hittades.</p>
          ) : (
            books.map((book, index) => (
              <li
                key={index}
                className="flex flex-col items-center w-40 h-65 bg-white p-4 shadow-[0px_0px_4px_3px_rgba(195,186,171,0.3)] cursor-pointer"
                onClick={() => handleBookClick(book)}
              >
                {book.coverUrl && (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-50 h-40 object-contain mb-0"
                  />
                )}
                <h2 className="text-center break-words">{book.title}</h2>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default RandomBooksWidget;

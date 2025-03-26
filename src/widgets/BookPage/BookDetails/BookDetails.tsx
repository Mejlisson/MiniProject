import { useEffect, useState } from "react";
import { fetchAuthorDetails } from "../../../api/fetchAuthorsByRandomBooks";
import { FaHeart, FaStar } from "react-icons/fa";
import type { Book } from "../../../types/types";

const BookDetails = ({ book }: { book: Book }) => {
  const [authors, setAuthors] = useState<{ key: string; name: string }[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      if (!Array.isArray(book.authors)) return;

      const fetchedAuthors = await Promise.all(
        book.authors.map(async (authorWrapper: any) => {
          const authorKey = authorWrapper.author?.key;
          return await fetchAuthorDetails(authorKey);
        }),
      );

      setAuthors(fetchedAuthors);
    };

    fetchAuthors();
  }, [book.authors]);

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg w-5/6 ">
      {/* Book Cover + Favorite Button */}
      <div className="relative">
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
          className="w-40 max-w-md p-3 h-auto rounded-md shadow-md mt-6"
          alt={book.title}
        />
        <button
          className={`absolute top-2 -right-200 text-3xl ${
            isFavorite ? "text-red-500" : "text-gray-300"
          }`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <FaHeart />
        </button>
      </div>
      {/* Book Information */}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-ravi">{book.title}</h1>
        <p className="text-gray-700 italic break-words w-auto pr-1.5">
          {typeof book.description === "string"
            ? book.description
            : book.description?.value || "No description found..."}
        </p>
        <p className="font-ravi text-xl text-gray-900 mt-2">
          {authors.length > 0
            ? authors.map((author, index) => (
                <span key={author.key || index}>{author.name}</span>
              ))
            : "Unknown"}
        </p>
        {/* Rating */}
        <div className="mt-1 flex text-yellow-400 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={
                rating !== null && star <= rating
                  ? "text-yellow-500"
                  : "text-gray-300"
              }
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

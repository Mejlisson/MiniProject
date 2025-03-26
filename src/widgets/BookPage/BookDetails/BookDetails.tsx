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
      <div className="w-40 h-70 flex flex-col items-center">
        <div className="w-full flex justify-end">
          <button
            className={`text-3xl transition-all duration-300 ease-in-out ${isFavorite ? "text-red-500 hover:scale-110 hover:drop-shadow-md" : "text-gray-300 hover:text-red-400 hover:scale-110 hover:drop-shadow-md"}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <FaHeart />
          </button>
        </div>
        <img
          src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
          className="w-40 max-w-md p-3 h-auto rounded-md shadow-md mt-2"
          alt={book.title}
        />
      </div>

      {/* Book Information */}
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-ravi pl-0.5">{book.title}</h1>
        <p className="overflow-hidden max-h-[100px] hover:max-h-[500px] transition-all duration-300 ease-in-out">
          {typeof book.description === "string"
            ? book.description
            : book.description?.value || "No description found..."}
          {typeof book.description === "string"
            ? book.description.length > 100
              ? `${book.description.substring(0, 100)}...`
              : book.description
            : book.description?.value.length > 100
              ? `${book.description.value.substring(0, 100)}...`
              : book.description?.value || "No description found..."}
        </p>
        <p className="font-ravi text-xl text-gray-900 mt-2">
          Author:
          {<br></br>}
          {authors.length > 0
            ? authors.map((author, index) => (
                <span key={author.key || index}> {author.name}</span>
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

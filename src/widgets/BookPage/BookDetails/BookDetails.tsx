import { useEffect, useState } from "react";
import { fetchAuthorDetails } from "../../../api/fetchAuthorsByRandomBooks";
import { FaHeart, FaStar } from "react-icons/fa";
import { Book, Author } from "../../../types/types";
import { useFavoritBooks } from "../../../hooks/useFavoritBook";
import { useRating } from "../../../context/RatingContext";

const BookDetails = ({ book }: { book: Book }) => {
  const [authors, setAuthors] = useState<{ key: string; name: string }[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const { toggleFavorite, isFavorite } = useFavoritBooks();
  const [loading, setLoading] = useState<boolean>(true);
  const { addRating, ratings } = useRating();

  useEffect(() => {
    const savedRating = ratings.find((r) => r.bookKey === book.key)?.rating;
    if (savedRating) {
      setRating(savedRating);
    }
  }, [book.key, ratings]);

  const handleRating = (star: number) => {
    setRating(star); // Uppdatera lokalt state
    addRating(book.key, book.title, star); // Spara betyget i global state
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      if (!Array.isArray(book.authors)) {
        setLoading(false); // Stoppa laddningen
        return;
      }

      const fetchedAuthors = await Promise.all(
        book.authors.map(async (authorWrapper: any) => {
          const authorKey = authorWrapper.author?.key;
          return await fetchAuthorDetails(authorKey);
        }),
      );

      setAuthors(fetchedAuthors);
      setLoading(false);
    };

    fetchAuthors();
  }, [book.authors]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <img
          src="/frog(2).gif"
          alt="Loading animation"
          className="w-50 h-50 mb-2"
        />
        <p className="text-green-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-lg w-5/6">
      {/* Book Cover + Favorite Button */}
      <div className="w-40 h-70 flex flex-col items-center relative">
        <button
          className={`absolute top-2 right-2 text-3xl transition-all duration-300 ease-in-out ${
            isFavorite(book)
              ? "text-red-500 hover:scale-110 hover:drop-shadow-md"
              : "text-gray-300 hover:text-red-400 hover:scale-110 hover:drop-shadow-md"
          }`}
          onClick={() => toggleFavorite(book)}
        >
          <FaHeart />
        </button>
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
        </p>

        <p className="font-ravi text-xl text-gray-900 mt-2">
          Authors:
          {<br></br>}
          {authors.length > 0
            ? authors.map((author, index) => (
                <span key={author.key || index}> {author.name}</span>
              ))
            : " Unknown"}
        </p>

        {/* Rating */}
        <div className="mt-1 flex text-yellow-400 text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`transition-all duration-300 ease-in-out cursor-pointer ${
                rating !== null && star <= rating
                  ? "text-yellow-500 scale-110"
                  : "text-gray-300"
              } hover:scale-125 hover:text-yellow-400 active:scale-95`}
              onClick={() => handleRating(star)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

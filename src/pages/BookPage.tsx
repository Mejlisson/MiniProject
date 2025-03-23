import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book, Author } from "../types/types";
import { FaArrowLeft, FaHeart, FaStar } from "react-icons/fa";
import { fetchBooksByAuthor } from "../api/fetchBooksByAuthor";

const slugify = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const BookPage = () => {
  const { bookSlug } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [authorBooks, setAuthorBooks] = useState<any[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Current bookSlug:", bookSlug);

    const fetchBooks = async () => {
      try {
        if (!bookSlug) {
          // console.error("Invalid bookSlug:", bookSlug);
          return;
        }

        const response = await fetch(
          `https://openlibrary.org/subjects/fantasy.json?limit=50`,
        );
        if (!response.ok) throw new Error("Failed to fetch books");
        const data = await response.json();

        // console.log("Available books:", data.works);
        const matchedBook = data.works.find(
          (book: { title: string }) => slugify(book.title) === bookSlug,
        );

        if (matchedBook) {
          const bookResponse = await fetch(
            `https://openlibrary.org${matchedBook.key}.json`,
          );
          if (!bookResponse.ok) throw new Error("Failed to fetch book details");
          const bookData = await bookResponse.json();
          // console.log("Book data:", bookData);
          setBook(bookData);

          if (bookData.authors && bookData.authors.length > 0) {
            const author = bookData.authors[0].author;
            if (author && author.key) {
              // console.log("Author key:", author.key);
              const books = await fetchBooksByAuthor(author.key);
              // console.log("Fetched author books:", books);
              setAuthorBooks(books);
            } else {
              console.warn(
                "Author key is missing for author:",
                bookData.authors[0],
              );
            }
          } else {
            console.warn("No authors found for this book.");
          }
        } else {
          console.error("Book not found");
        }
      } catch (error) {
        console.error("Error in fetchBooks:", error);
        setBook(null); // Återställ boken till null om det blir ett fel
      }
    };

    if (bookSlug) {
      fetchBooks();
    }
  }, [bookSlug]);

  const handleBookClick = (book: Book) => {
    const bookSlug = slugify(book.title);
    console.log("Navigating to:", `/book/${bookSlug}`);
    navigate(`/book/${bookSlug}`);
  };
  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Back button */}
      <button
        className="self-start texl-xl mb-4 flex items-center gap-2 hover:text-blue-600"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Backwards
      </button>
      {/* Main Book Container */}
      <div className="flex flex-col md:flex-row gap-6 bg-white p6 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Book Cover + Favorite Button */}
        <div className="relative">
          <img
            src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
            className="w-48 h-auto rounded-md shadow-md"
            alt={book.title}
          />
          <button
            className={`absolute top-2 right-2 text-3xl ${
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
          <p className="text-gray-700 italic">
            {typeof book.description === "string"
              ? book.description
              : book.description?.value || "No description found..."}
          </p>
          <p className="font-semibold text-gray-900 mt-2">
            Authors:
            {book.authors && book.authors.length > 0
              ? book.authors.map((author: Author, index) => (
                  <span key={author.key || index}>{author.name}</span>
                ))
              : " Unknown"}
          </p>
          {/* Rating */}
          <div className="mt-4 flex text-yellow-400 text-2xl">
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
      {/* Related Books */}
      <h3 className="mt-6 text-lg font-ravi">See more books by this author:</h3>
      <div className="flex gap-4 mt-2 flex-wrap">
        {authorBooks.length > 0 ? (
          authorBooks.slice(0, 4).map((book: Book, index) => (
            <div
              key={book.key || index}
              className="bg-white p-2 rounded-lg shadow-md w-32"
              onClick={() => handleBookClick(book)}
            >
              <img
                src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
                className="w-full h-auto rounded"
                alt={book.title}
              />
              <p className="text-center text-sm mt-1 font-ravi">{book.title}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No related books found.</p>
        )}
      </div>

      {book.authors && book.authors.length > 0 && (
        <Link
          to={`/author${book.authors[0].key}`}
          className="text-blue-600 hover:underline mt-4 block"
        >
          Visit the Author
        </Link>
      )}
    </div>
  );
};

export default BookPage;

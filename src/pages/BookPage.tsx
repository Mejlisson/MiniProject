import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book } from "../types/types";
import { fetchBooksByAuthor } from "../api/fetchBooksByAuthor";
import useBookSlug from "../hooks/slugifyHooks";
import BookDetails from "../widgets/BookPage/BookDetails/BookDetails";
import RelatedBooks from "../widgets/BookPage/RelatedBooks/RelatedBooks";
import BackButton from "../widgets/BookPage/BackButton/BackButton";

const BookPage = () => {
  const { bookKey, bookSlug } = useParams(); // Hämta både bookKey och bookSlug från URL:en
  const [book, setBook] = useState<Book | null>(null);
  const [authorBooks, setAuthorBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  // Hämta boken baserat på bookKey
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (!bookKey) {
          console.error("Invalid bookKey:", bookKey);
          return;
        }

        // Kontrollera om boken redan finns i localStorage
        const cachedBook = localStorage.getItem(`book-${bookKey}`);
        if (cachedBook) {
          setBook(JSON.parse(cachedBook));
          return;
        }

        // Hämta boken från API:et om den inte finns i localStorage
        const bookResponse = await fetch(
          `https://openlibrary.org/works/${bookKey}.json`,
        );
        if (!bookResponse.ok) throw new Error("Failed to fetch book details");
        const bookData = await bookResponse.json();

        // Spara boken i localStorage
        localStorage.setItem(`book-${bookKey}`, JSON.stringify(bookData));
        setBook(bookData);

        // Hämta böcker av samma författare
        if (bookData.authors && bookData.authors.length > 0) {
          const author = bookData.authors[0].author;
          if (author && author.key) {
            const books = await fetchBooksByAuthor(author.key);
            setAuthorBooks(books);
          }
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        setBook(null);
      }
    };

    fetchBook();
  }, [bookKey]);

  // Kontrollera om bookSlug matchar
  useEffect(() => {
    if (book && useBookSlug(book).bookSlug !== bookSlug) {
      console.warn("Book slug does not match URL slug.");
    }
  }, [book, bookSlug]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center p-6 mt-17 bg-gray-100 min-h-screen">
      <BackButton navigate={navigate} />
      <BookDetails book={book} />
      <RelatedBooks books={authorBooks} navigate={navigate} />
    </div>
  );
};

export default BookPage;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book } from "../types/types";

const BookPage = () => {
  const { bookTitleSlug } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://openlibrary.org/works/${bookTitleSlug}.json`,
        );
        if (!response.ok) throw new Error("Failed to fetch book details");
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (bookTitleSlug) {
      fetchBook();
    }
  }, [bookTitleSlug]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-30">
      <h1>{book.title}</h1>
      <p>{typeof book.description === "string" ? book.description : book.description?.value}</p>
    </div>
  );
};

export default BookPage;

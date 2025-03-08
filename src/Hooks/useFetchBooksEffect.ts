import { useState, useEffect } from "react";
import { fetchRandomBooks } from "../API/randomBooksApi";
import { Book } from "../types/types";

const useFetchBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
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

  return { books, loading };
};

export default useFetchBooks;

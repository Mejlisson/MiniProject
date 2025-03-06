import { useState, useEffect } from "react";
import { fetchRandomBooks } from "../API/randomBooksApi";

const useFetchBooks = () => {
  const [books, setBooks] = useState<
    { title: string; coverUrl: string | null }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBooks = async () => {
      setLoading(true);
      const books = await fetchRandomBooks();
      setBooks(books);
      setLoading(false);
      console.log("Number of books:", books.length);
    };

    fetchBooks();
    return () => {
      isMounted = false;
    };
  }, []);

  return { books, loading };
};

export default useFetchBooks;

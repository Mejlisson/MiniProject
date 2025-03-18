import { useEffect, useReducer } from "react";
import { fetchRandomBooks } from "../API/randomBooksApi";
import {
  bookReducer,
  initialState,
} from "../Hooks/UseReducer";

const useFetchBooks = () => {
  const [state, dispatch] = useReducer(
    bookReducer,
    initialState,
  );

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        const books = await fetchRandomBooks();
        dispatch({ type: "FETCH_SUCCESS", payload: books });
        console.log("Number of books:", books.length);
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };

    fetchBooks();
  }, []);

  return state; // Returnerar hela state-objektet
};

export default useFetchBooks;

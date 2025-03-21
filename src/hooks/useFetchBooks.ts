import { useEffect, useReducer } from "react";
import { fetchRandomBooks } from "../api/fetchRandomBooks";
import { bookReducer, initialState } from "../reducers/bookReducer";

const useFetchBooks = () => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        const books = await fetchRandomBooks();
        dispatch({ type: "FETCH_SUCCESS", payload: books });
        console.log("Antal böcker hämtade:", books.length);
      } catch (error) {
        console.error("Fel vid hämtning av böcker:", error);
        dispatch({ type: "FETCH_ERROR", payload: error instanceof Error ? error.message : "Unknown error" });
      }
    };

    fetchBooks();
  }, []);

  return state; // Returnerar hela state-objektet
};

export default useFetchBooks;

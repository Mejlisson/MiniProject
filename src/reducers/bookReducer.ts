import { Book } from "../types/types";

export type BookState = {
  books: Book[];
  loading: boolean;
  error: string | null;
};

export type BookAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Book[] }
  | { type: "FETCH_ERROR"; payload: string };

export const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

export const bookReducer = (
  state: BookState,
  action: BookAction,
): BookState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { books: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { books: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

import { Book } from "../types/types";

export type BookState = {
  books: Book[];
  loading: boolean;
};

export type BookAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Book[] }
  | { type: "FETCH_ERROR" };

export const initialState: BookState = {
  books: [],
  loading: false,
};

export const bookReducer = (
  state: BookState,
  action: BookAction,
): BookState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { books: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, loading: false };
    default:
      return state;
  }
};

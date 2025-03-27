//en custom hook för att hantera favoritböcker i ett local state

import { useState } from "react";
import { Book } from "../types/types"


export const useFavoritBooks = () => {
    const [favoritBooks, setFavoritBooks] = useState<Book[]>([]);

    const toggleFavorite = (book: Book) => {
        setFavoritBooks((prev) => {
            const isAlreadyFavorite = prev.find((b) => b.key === book.key);
            if (isAlreadyFavorite) {
                return prev.filter((b) => b.key !== book.key);
            } else {
                return [...prev, book];
            }
        });
    };

    const isFavorite = (book: Book) => {
        return favoritBooks.some((b) => b.key === book.key);
    };

    return { favoritBooks, toggleFavorite, isFavorite };
};
import { createContext, useContext, useEffect, useState } from "react";
import { Book } from "../../types/types";

type FavoriteContextType = {
    favoritBooks: Book[];
    toggleFavorite: (book: Book) => void;
    isFavorite: (book: Book) => boolean;
};

export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoritBooks, setFavoritBooks] = useState<Book[]>(() => {

        const stored = localStorage.getItem("favoritBooks"); //hämtar från localStarage
        try {
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error("Fel vid tolkning av localStorage:", e);
            return [];
        }
    });

    //Uppdatera localStorage varje gång favoritBooks ändras
    useEffect(() => {
        localStorage.setItem("favoritBooks", JSON.stringify(favoritBooks));
    }, [favoritBooks]);

    const toggleFavorite = (book: Book) => {
        setFavoritBooks((prev) =>
            prev.some((b) => b.key === book.key)
                ? prev.filter((b) => b.key !== book.key)
                : [...prev, book]
        );
    };

    const isFavorite = (book: Book) => {
        return favoritBooks.some((b) => b.key === book.key);
    };

    return (
        <FavoriteContext.Provider value={{ favoritBooks, toggleFavorite, isFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

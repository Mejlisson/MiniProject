import { useContext } from "react";
import { FavoriteContext } from "../widgets/FavoritBook/FavoritBookContext";

export const useFavoritBooks = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFavoritBooks must be used within a FavoriteProvider");
    }
    return context;
};
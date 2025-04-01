import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book } from "../types/types";

export default function AuthorPage() {
    const { authorName } = useParams();
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);

    const decodedName = decodeURIComponent(authorName || "");

    // Hämta böcker av författaren
    useEffect(() => {
        const fetchBooks = async () => {
            if (!authorName) return;

            try {
                const response = await fetch(
                    `https://openlibrary.org/search.json?author=${authorName}`
                );
                const data = await response.json();
                setBooks(data.docs.slice(0, 12)); // Max 12 böcker
            } catch (error) {
                console.error("Fel vid hämtning av böcker:", error);
            }
        };

        fetchBooks();

        // Kontrollera om författaren är favorit
        const saved = localStorage.getItem("favoriteAuthors");
        if (saved) {
            const favs = JSON.parse(saved);
            setIsFavorite(favs.includes(decodedName));
        }
    }, [authorName]);

    // Toggle favorit
    const toggleFavorite = () => {
        const saved = localStorage.getItem("favoriteAuthors");
        const favs = saved ? JSON.parse(saved) : [];

        let updatedFavs;
        if (isFavorite) {
            updatedFavs = favs.filter((a: string) => a !== decodedName);
        } else {
            updatedFavs = [...favs, decodedName];
        }

        localStorage.setItem("favoriteAuthors", JSON.stringify(updatedFavs));
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                    {decodedName} har även skrivit dessa böcker:
                </h2>
                <button
                    onClick={toggleFavorite}
                    className="text-2xl hover:scale-110 transition-transform"
                    title={isFavorite ? "Ta bort från favoriter" : "Lägg till som favorit"}
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>
            </div>

            {books.length === 0 ? (
                <p className="text-gray-600 text-center">Inga böcker hittades.</p>
            ) : (
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {books.map((book: any) => (
                        <li
                            key={book.key}
                            onClick={() =>
                                navigate(
                                    `/book/${book.key.replace("/works/", "")}/${encodeURIComponent(
                                        book.title
                                    )}`
                                )
                            }
                            className="cursor-pointer bg-white p-4 shadow hover:bg-gray-100"
                        >
                            <img
                                src={
                                    book.cover_i
                                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                                        : "/MissingCover.png"
                                }
                                alt={book.title}
                                className="w-full h-40 object-contain mb-2"
                            />
                            <p className="text-center font-medium">{book.title}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

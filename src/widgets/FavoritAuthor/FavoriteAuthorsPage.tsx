import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FavoriteAuthorsPage() {
    const [favoriteAuthors, setFavoriteAuthors] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("favoriteAuthors");
        if (saved) {
            setFavoriteAuthors(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto mt-12">
            <h1 className="text-3xl font-bold mb-6 text-center">
                Dina Favoritförfattare:
            </h1>

            {favoriteAuthors.length === 0 ? (
                <p className="text-center text-gray-600">
                    Du har inte lagt till några favoritförfattare ännu.
                </p>
            ) : (
                <ul className="space-y-4">
                    {favoriteAuthors.map((author, index) => (
                        <li key={index} className="border-b pb-2">
                            <Link to={`/author/${encodeURIComponent(author)}`}
                                className="text-blue-600 hover:underline text-lg"
                            >
                                {author}
                            </Link>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

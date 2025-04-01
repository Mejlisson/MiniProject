import { useFavoritBooks } from "../../hooks/useFavoritBook";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const FavoritBooks = () => {
    const { favoritBooks, toggleFavorite } = useFavoritBooks();

    const generateSlug = (title: string) =>
        title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Mina Favoriter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {favoritBooks.map((book) => {
                    const slug = generateSlug(book.title);
                    return (
                        <div
                            key={book.key}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform"
                        >
                            <Link
                                to={`/book/${book.key.replace("/works/", "")}/${slug}`}
                                className="flex flex-col items-center"
                            >
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
                                    alt={book.title}
                                    className="w-32 h-auto rounded-md"
                                />
                                <p className="text-center font-semibold mt-2">{book.title}</p>
                            </Link>


                            <button
                                className="mt-2 text-red-500 hover:text-red-400 hover:scale-600 duration-200 hover:drop-shadow-md cursor-pointer text-xl"
                                onClick={() => toggleFavorite(book)}
                                title="Remove from favorites"
                            >
                                <FaHeart />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FavoritBooks;
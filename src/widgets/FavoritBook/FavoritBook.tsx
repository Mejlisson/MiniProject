import { useFavoritBooks } from "../../hooks/useFavorite";
import { FaHeart } from "react-icons/fa";

const FavoritBooks = () => {
    const { favoritBooks } = useFavoritBooks();

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Mina Favoriter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {favoritBooks.map((book) => (
                    <div
                        key={book.key}
                        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                    >
                        <img
                            src={`https://covers.openlibrary.org/b/id/${book.covers?.[0]}-L.jpg`}
                            alt={book.title}
                            className="w-32 h-auto rounded-md"
                        />
                        <FaHeart className="text-red-500 mt-2" />
                        <p className="text-center font-semibold mt-2">{book.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoritBooks;
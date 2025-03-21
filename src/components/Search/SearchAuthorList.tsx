import { Link } from "react-router-dom";

interface AuthorSearchProps {
  query: string;
  authors: string[];
  loading: boolean;
  error: string | null;
}

export default function AuthorSearch({
  query,
  authors,
  loading,
  error,
}: AuthorSearchProps) {
  if (loading)
    return (
      <p className="text-green-800 text-center animate-pulse">Loading...</p>
    );
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="mt-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-center">Sök Resultat</h2>
      {authors.length > 0 ? (
        <ul className="mt-4">
          {authors.map((author, index) => (
            <li key={index} className="py-2 text-gray-700 border-b">
              {/* 🔹 Klickbar länk till författarsida */}
              <Link
                to={`/author/${encodeURIComponent(author)}`}
                className="text-blue-600 hover:underline"
              >
                {author}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-600 text-center">Inga resultat för "{query}"</p>
      )}
    </div>
  );
}

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
  // La till en enkel filtrering baserad på query
  const filteredAuthors = query.trim() === ""
    ? authors // om man inte söker visas alla författare
    : authors.filter(author =>
        author.toLowerCase().includes(query.toLowerCase())
      );

  if (loading)
    return (
      <p className="text-green-800 text-center animate-pulse">Loading...</p>
    );
  if (error) return <p className="text-red-600 text-center">{error}</p>;

  return (
    <div className="mt-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4 text-center">Sök Resultat</h2>
      {filteredAuthors.length > 0 ? (  //filterede Authors istället för authors
        <ul className="mt-4">
          {filteredAuthors.map((author, index) => (
            <li key={index} className="py-2 text-gray-700 border-b">
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
        <p className="text-red-600 text-center">
          {query ? `Inga resultat för "${query}"` : "Skriv en sökfråga"}
        </p>
      )}
    </div>
  );
}
import { useFetch } from "../../Hooks/useFetch";

interface AuthorSearchProps {
  query: string;
  authors: string[];
  loading: boolean;
  error: string | null;
}

  export default function AuthorSearch({ query, authors, loading, error }: AuthorSearchProps) {
    
    return (
        <div className="mt-6 w-full max-w-2xl">
      {loading ? (
        <p className="text-center text-green-800 animate-pulse">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : authors.length > 0 ? (
        <ul className="mt-4">
          {authors.map((author, index) => (
            <li key={index} className="py-2 text-gray-700 border-b">
              {author}
            </li>
          ))}
        </ul>
      ) : (
        query && <p className="flex justify-center items-center mt-4 text-red-600 animate-pulse">No Authors Found</p>
      )}
    </div>
  );
}
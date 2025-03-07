import { useFetch } from "../../Hooks/useFetch";

interface AuthorSearchProps {
    query: string;
  }

  export default function AuthorSearch({ query }: AuthorSearchProps) {
    const url = `https://openlibrary.org/search.json?author=${query}&limit=50`;
    const { data, loading, error } = useFetch(url, query, true);


    const authors: string[] = Array.from(
        new Set(data.map((item: any) => item.author_name).flat()) //Plockar ut unika författare Namn
    );
     return (
        <div className="mt-6 w-full max-w-2xl">
      {loading ? (
        <p className="text-center text-green-700 animate-pulse">Loading...</p>
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
        query && <p className="mt-4 text-red-600">Inga författare hittades</p>
      )}
    </div>
  );
}
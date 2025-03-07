import {useState} from "react";
import useFetch from "../../Hooks/useFetch";

interface Book {
  title: string;
  cover_i?: number;
}

interface BookSearchProps{ //En callback-funktion för att kolla sökstatus
  onSearch: (searching: boolean) => void;
}

export default function BookSearch({ onSearch }: BookSearchProps) {
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<"title" | "author" | "q">("title"); // Välja sökningstyp
  const [searchTriggered, setSearchTriggered] = useState(false);

  //dynamisk URL
  const url = `https://openlibrary.org/search.json?${searchType}=${query}&limit=50`;

  //useFetch-hooken används här för att hämta data vi behöver
  const { data: books, loading, error } = useFetch(url, query, searchTriggered);

  // Hantera sökning
  const searchBooks = () => {
    if (!query.trim()) {
      onSearch(false);
      return;
    }
    setSearchTriggered(true);
    onSearch(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full flex justify-center py-12"
        style={{
          backgroundImage: "url('/MainImgGreen.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      {/* Sökfält */}
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
          className="w-full py-3 pl-6 pr-14 text-lg text-gray-700 placeholder-gray-500 bg-white border-none rounded-full shadow-lg focus:outline-none"
        />
        <button onClick={searchBooks} className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <img src="/SearchIcon.png" alt="Search" className="w-8 h-8" />
        </button>
      </div>
      </div>
      {/* Välj sökningstyp */}
      <div className="flex mt-4 space-x-4">
  {["title", "author", "q"].map((type) => (
    <label key={type} className="flex items-center space-x-2 cursor-pointer">
      <input
        type="radio"
        name="searchType"
        value={type}
        checked={searchType === type}
        onChange={() => setSearchType(type as "title" | "author" | "q")}
        className="w-5 h-5 text-blue-500 accent-blue-500"
      />
      <span className="text-gray-700">
        {type === "title" ? "Sök Titel" : type === "author" ? "Sök Författare" : "Sök Allt"}
      </span>
    </label>
  ))}
</div>




      {/* Resultat */}
      <div className="mt-6 w-full max-w-2xl">
        {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-green-700 animate-pulse">Loading...</p>
        </div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : books.length > 0 ? (
          <ul className="grid grid-cols-4 sm:grid-cols-4 gap-6 gap-x-25">
            {books.map((book: Book, index) => (
              <li key={index} className="flex flex-col items-center w-40 h-65 bg-white p-4 shadow-md">
                <img
                  src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : "/Img/UnDefinedBook.png"}
                  alt={book.title}
                  className="w-40 h-65 object-cover mb-2 rounded-md truncate"
                />
                <h2 className="text-center text-gray-700 font-semibold">{book.title}</h2>
              </li>
            ))}
          </ul>
        ) : (
          searchTriggered && query && <p className="mt-4 text-red-600">Inga böcker hittades</p>
        )}
      </div>
    </div>
  );
}

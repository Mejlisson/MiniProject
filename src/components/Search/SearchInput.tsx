import { RefObject } from "react";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  searchBooks: () => void;
  inputRef: RefObject<HTMLInputElement>;
}

export default function SearchInput({ query, setQuery, searchBooks, inputRef }: SearchInputProps) {
  return (
    <div className="w-full flex justify-center items-center bg-[url('/MainImgGreen.png')] bg-cover bg-center bg-no-repeat h-[400px]">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
          ref={inputRef}
          className="w-full py-3 pl-6 pr-14 text-lg text-gray-700 placeholder-gray-500 bg-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#75bcc0]"
        />
        <button onClick={searchBooks} className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <img src="/SearchIcon.png" alt="Search" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

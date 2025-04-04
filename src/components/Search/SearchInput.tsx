import { RefObject } from "react";

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  searchBooks: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onFocus: () => void;
}

export default function SearchInput({
  query,
  setQuery,
  searchBooks,
  inputRef,
  onFocus,
}: SearchInputProps) {
  return (
    <div className="w-full flex justify-center items-center bg-[url('/MainImgGreen.png')] bg-cover bg-center bg-no-repeat h-[400px]">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Search... "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
          onFocus={onFocus}
          ref={inputRef}
          className="w-full py-3 pl-6 pr-14 text-2xl text-gray-700 font-ravi placeholder-gray-500 bg-white border-none rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-[#c1e8d5a0]"
        />
        <button
          onClick={searchBooks}
          className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 
  transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-12 focus:scale-110 focus:rotate-12 opacity-95"
        >
          <img src="/SearchIcon.png" alt="Search" className="w-12 h-10" />
        </button>
      </div>
    </div>
  );
}

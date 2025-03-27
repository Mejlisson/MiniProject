import { useState } from "react";
import SearchFunction from "./SearchFunction";
import { SearchProvider } from "../../context/SearchContext";
import RandomBooksWidget from "../../widgets/BookPage/RandomBooksWidget";

export default function CombinedSearch() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchProvider>
      <div className="flex flex-col items-center">
        <SearchFunction onSearch={(searching) => setIsSearching(searching)} />
        {!isSearching && <RandomBooksWidget />}
      </div>
    </SearchProvider>
  );
}

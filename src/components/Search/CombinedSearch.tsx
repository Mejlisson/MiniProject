import { useState } from "react";
import SearchFunction from "./SearchFunction";
import RandomBooksComponent from "../randomBooks/randomBooks";
import { SearchProvider } from "../../context/searchContext";

export default function CombinedSearch() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchProvider>
      <div className="flex flex-col items-center">
        <SearchFunction onSearch={(searching) => setIsSearching(searching)} />
        {!isSearching && <RandomBooksComponent />}
      </div>
    </SearchProvider>
  );
}

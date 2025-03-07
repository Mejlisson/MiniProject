import { useState } from "react";
import BookSearch from "./SearchBook";
import RandomBooksComponent from "../randomBooks/randomBooks";

export default function CombinedSearch() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <BookSearch onSearch={(searching) => setIsSearching(searching)} />
      {!isSearching && <RandomBooksComponent />}
    </div>
  );
}

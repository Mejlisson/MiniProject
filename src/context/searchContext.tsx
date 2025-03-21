import { createContext, useState, ReactNode } from "react";

type SearchType = "title" | "author" | "q";

interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  searchType: SearchType;
  setSearchType: (type: SearchType) => void;
  searchTriggered: boolean;
  setSearchTriggered: (triggered: boolean) => void;
}

export const SearchContext = createContext<SearchContextProps | null>(null);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<SearchType>("title");
  const [searchTriggered, setSearchTriggered] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        searchType,
        setSearchType,
        searchTriggered,
        setSearchTriggered,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

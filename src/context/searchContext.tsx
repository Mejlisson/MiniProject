import React, { createContext, useState, ReactNode } from "react";

interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
  searchType: "title" | "author" | "q";
  setSearchType: (type: "title" | "author" | "q") => void;
  searchTriggered: boolean;
  setSearchTriggered: (triggered: boolean) => void;
}

export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined,
);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<"title" | "author" | "q">(
    "title",
  );
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

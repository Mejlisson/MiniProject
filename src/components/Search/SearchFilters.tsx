interface SearchFiltersProps {
  searchType: "title" | "author" | "q";
  setSearchType: (type: "title" | "author" | "q") => void;
}

export default function SearchFilters({
  searchType,
  setSearchType,
}: SearchFiltersProps) {
  return (
    <div className="flex mt-4 space-x-4">
      {["title", "author", "q"].map((type) => (
        <label
          key={type}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name="searchType"
            value={type}
            checked={searchType === type}
            onChange={() => setSearchType(type as "title" | "author" | "q")}
            className="w-5 h-5 text-blue-500 accent-blue-500"
          />
          <span className="text-gray-700">
            {type === "title"
              ? "Search by Title"
              : type === "author"
                ? "Search by Author"
                : "Search General"}
          </span>
        </label>
      ))}
    </div>
  );
}

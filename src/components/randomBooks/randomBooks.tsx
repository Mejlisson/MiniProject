import React, { useState, useEffect } from "react";

export const fetchRandomBooks = async () => {
  const url = `https://openlibrary.org/subjects/fantasy.json?limit=100`;
  const response = await fetch(url);
  const data = await response.json();

  console.log("Total books from API:", data.works.length);

  if (!data.works.length) {
    console.log("Inga böcker hittades");
    return [];
  }

  // Skapa en lista med böcker som har omslagsbilder
  const booksWithCovers = data.works
    .map((book: any) => ({
      title: book.title,
      coverUrl: book.cover_id
        ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
        : null,
    }))
    .filter((book) => book.coverUrl);

  console.log("Books with covers:", booksWithCovers.length);

  const shuffledBooks = [...booksWithCovers].sort(() => Math.random() - 0.5);

  const slicedBooks = shuffledBooks.slice(0, 12);

  console.log("Final books count:", slicedBooks.length);
  return slicedBooks;
};

const RandomBooksComponent: React.FC = () => {
  const [books, setBooks] = useState<
    { title: string; coverUrl: string | null }[]
  >([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await fetchRandomBooks();
      setBooks(books);
      console.log("Number of books:", books.length);
    };

    fetchBooks();
  }, []);
  return (
    <div className="p-4 flex justify-center">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center space-x-30 justify-center pl-32">
        {books.map((book, index) => (
          <li
            key={index}
            className="flex flex-col items-center w-40 bg-white p-4 rounded-lg shadow-[0px_0px_4px_3px_rgba(195,186,171,0.3)]"
          >
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-50 h-40 object-contain mb-2"
              />
            )}
            <h2 className="text-center break-words">{book.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomBooksComponent;

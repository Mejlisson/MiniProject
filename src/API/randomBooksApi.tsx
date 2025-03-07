import { Book } from "../types/types";
export const fetchRandomBooks = async () => {
  const url = `https://openlibrary.org/subjects/fantasy.json?limit=50`;
  const response = await fetch(url);
  const data = await response.json();

  console.log("Total books from API:", data.works.length);

  if (!data.works.length) {
    console.log("Inga böcker hittades");
    return [];
  }

  // Skapa en lista med böcker som har omslagsbilder
  const booksWithCovers = data.works
    .map((book: Book) => ({
      title: book.title,
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null,
    }))
    .filter((book: { coverUrl: Book }) => book.coverUrl);

  console.log("Books with covers:", booksWithCovers.length);

  const shuffledBooks = [...booksWithCovers].sort(() => Math.random() - 0.5);

  const slicedBooks = shuffledBooks.slice(0, 12);

  console.log("Final books count:", slicedBooks.length);
  return slicedBooks;
};

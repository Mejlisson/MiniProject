import type { Book } from "../types/types";

export const fetchRandomBooks = async (): Promise<Book[]> => {
  try {
    const url = `https://openlibrary.org/subjects/fantasy.json?limit=50`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data = await response.json();

    if (!data.works?.length) {
      console.log("Inga böcker hittades");
      return [];
    }

    const booksWithCovers: Book[] = data.works
      .map(
        (book: {
          title: string;
          cover_id?: number;
          key: string; // 👈 Add this from API response
        }) => ({
          title: book.title,
          coverUrl: book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
            : null,
          key: book.key, // 👈 This is the crucial addition
        }),
      )
      .filter((book) => book.coverUrl !== null);

    return booksWithCovers.sort(() => 0.5 - Math.random()).slice(0, 12);
  } catch (error) {
    console.error("Fel vid hämtning av böcker:", error);
    return [];
  }
};

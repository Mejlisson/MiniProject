export const fetchBooksByAuthor = async (authorKey: string) => {
  if (!authorKey) {
    console.error("Invalid author key:", authorKey);
    return [];
  }

  try {
    const response = await fetch(
      `https://openlibrary.org${authorKey}/works.json`,
    );
    if (!response.ok) throw new Error("Failed to fetch author's books");
    const data = await response.json();

    // console.log("Author books data:", data.entries);

    return data.entries.map((entry: any) => ({
      title: entry.title,
      covers: entry.covers || [],
      key: entry.key,
      description: entry.description || null,
    }));
  } catch (error) {
    console.error("Error fetching books by author:", error);
    return [];
  }
};

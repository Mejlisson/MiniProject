export const fetchAuthorDetails = async (authorKey: string) => {
  if (!authorKey) {
    console.error("Invalid author key", authorKey);
    return { key: authorKey, name: "Unkown Author" };
  }

  try {
    const response = await fetch(`https://openlibrary.org${authorKey}.json`);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();

    return {
      key: authorKey,
      name: data.name || "Unkown Author",
    };
  } catch (error) {
    console.error("Error fetching details", error);
    return { key: authorKey, name: "Unkown Author" };
  }
};

import { Book } from "../types/types";

const slugify = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const useBookSlug = (book: Book) => {
  const bookKey = book.key.replace("/works/", ""); // Extract ID
  const bookSlug = slugify(book.title); // Generate slug

  return { bookKey, bookSlug };
};

export default useBookSlug;

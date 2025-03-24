import { useNavigate } from "react-router-dom";

export default function useNavigateToBook() {
  const navigate = useNavigate();

  const navigateToBook = (book: { key: string; title: string }) => {
    const bookKey = book.key.split("/").pop(); // Extrahera bookKey
    const bookSlug = book.title.replace(/\s+/g, "-").toLowerCase(); // Skapa slug
    navigate(`/book/${bookKey}/${bookSlug}`); // Navigera till BookPage
  };

  return navigateToBook;
}

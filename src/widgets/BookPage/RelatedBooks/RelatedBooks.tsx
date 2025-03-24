import { useState } from "react";
import { Book } from "../../../types/types";
import useBookSlug from "../../../hooks/slugifyHooks";
import { Link } from "react-router-dom";

const RelatedBooks = ({
  books,
  navigate,
}: {
  books: Book[];
  navigate: (path: string) => void;
}) => {
  const handleBookClick = (relatedBook: Book) => {
    const { bookKey, bookSlug } = useBookSlug(relatedBook);
    navigate(`/book/${bookKey}/${bookSlug}`); // Navigera till BookPage
  };

  return (
    <>
      <h3 className="mt-6 text-lg font-ravi">See more books by this author:</h3>
      <div className="flex gap-4 mt-2 flex-wrap">
        {books.length > 0 ? (
          books.slice(0, 4).map((relatedBook: Book, index) => {
            return (
              <div
                key={relatedBook.key || index}
                className="bg-white p-2 rounded-lg shadow-md w-34 h-auto cursor-pointer"
                onClick={() => handleBookClick(relatedBook)}
              >
                <img
                  src={
                    relatedBook.covers?.[0]
                      ? `https://covers.openlibrary.org/b/id/${relatedBook.covers[0]}-L.jpg`
                      : "/MissingCover.png"
                  }
                  className="w-full h-40 rounded"
                  alt={relatedBook.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/MissingCover.png";
                  }}
                />
                <p className="text-center text-sm mt-1 font-ravi word-break">
                  {relatedBook.title}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No related books found.</p>
        )}
      </div>

      <Link
        to={`/author/${books[0]?.authors?.[0]?.author?.key}`}
        className="text-[#034947] font-ravi text-xl hover:underline mt-4 block"
      >
        Visit the Author
      </Link>
    </>
  );
};

export default RelatedBooks;

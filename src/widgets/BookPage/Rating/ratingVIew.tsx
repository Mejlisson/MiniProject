import React from "react";
import { useRating } from "../../../context/RatingContext";
import { useNavigate } from "react-router-dom";
import useBookSlug from "../../../hooks/slugifyHooks";

const RatingView = () => {
  const { ratings, removeRating } = useRating();
  const navigate = useNavigate();

  if (ratings.length === 0) {
    return <p className="text-center text-gray-500">Inga betyg ännu.</p>;
  }

  const averageRating =
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

  // Fördelning av betyg för statistik
  const ratingDistribution = [1, 2, 3, 4, 5].map((star) => ({
    star,
    count: ratings.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="p-6 mt-18">
      <h2 className="text-3xl font-ravi mb-3">Grades and Statistics</h2>
      <p className="text-lg mb-4">
        Average rating : {averageRating.toFixed(1)}
      </p>

      {/* Statistik: Fördelning av betyg */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Distribution of grades :</h3>
        <ul className="flex gap-4">
          {ratingDistribution.map(({ star, count }) => (
            <li key={star} className="flex flex-col items-center">
              <p className="text-lg font-bold">{star} Stars</p>
              <p className="text-gray-600">{count} Votes</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Lista över betyg */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ratings.map((rating) => {
          const { bookKey, bookSlug } = useBookSlug({
            key: rating.bookKey,
            title: rating.title,
            covers: [],
            description: "",
            first_publish_date: "",
            first_sentence: {
              type: "",
              value: "",
            },
            subjects: [],
            authors: [],
          });

          const titleWords = rating.title.split(" ");
          const displayTitle =
            titleWords.length <= 10
              ? rating.title
              : `${titleWords.slice(0, 10).join(" ")}...`;
          return (
            <li
              key={rating.bookKey}
              className="rounded-lg shadow-md p-4 flex flex-col items-center"
              style={{
                background: "linear-gradient(to left, #155859, #1E2B3A)",
                height: "150px",
              }}
            >
              <h3 className="text-2xl font-ravi">{displayTitle}</h3>
              <p className="text-yellow-500 text-lg -mt-1">
                Rating: {rating.rating}/5
              </p>

              {/* Navigera till bokdetaljer */}
              <button
                onClick={() => navigate(`/book/${bookKey}/${bookSlug}`)}
                className="text-blue-500 hover:underline mt-2"
              >
                Show details
              </button>

              {/* Ta bort betyg */}
              <button
                onClick={() => removeRating(rating.bookKey)}
                className="text-red-500 hover:underline mt-2"
              >
                Remove rating
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RatingView;

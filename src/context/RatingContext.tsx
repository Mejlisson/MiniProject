import React, { createContext, useContext, useState } from "react";
import { Book } from "../types/types";

type Rating = {
  bookKey: string;
  title: string;
  rating: number;
};

type RatingContextType = {
  ratings: Rating[];
  addRating: (bookKey: string, title: string, rating: number) => void;
  removeRating: (bookKey: string) => void;
};

const RatingContext = createContext<RatingContextType | undefined>(undefined);

export const RatingProvider = ({ children }: { children: React.ReactNode }) => {
  const [ratings, setRatings] = useState<Rating[]>([]);

  const addRating = (bookKey: string, title: string, rating: number) => {
    setRatings((prevRatings) => {
      const existingRating = prevRatings.find((r) => r.bookKey === bookKey);
      if (existingRating) {
        // Uppdatera befintligt betyg
        return prevRatings.map((r) =>
          r.bookKey === bookKey ? { ...r, rating } : r,
        );
      }
      // Lägg till nytt betyg
      return [...prevRatings, { bookKey, title, rating,}];
    });
  };
  // function för ta bort rating
  const removeRating = (bookKey: string) => {
    setRatings((prevRatings) =>
      prevRatings.filter((r) => r.bookKey !== bookKey),
    );
  };

  return (
    <RatingContext.Provider value={{ ratings, addRating, removeRating }}>
      {children}
    </RatingContext.Provider>
  );
};

export const useRating = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRating must be used within a RatingProvider");
  }
  return context;
};

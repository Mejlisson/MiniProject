//URL =  "https://openlibrary.org/dev/docs/api/search"
import { useState } from "react";
import searchIcon from "../../Img/searchIcon.png";

export default function Search() {
  return (
    <div className="relative flex items-center w-full max-w-md mx-auto border-md border-amber-600">
      <input
        type="text"
        placeholder="Search ..."
        className="w-full pl-4 pr-12 py-3 rounded-full bg-white/80 backdrop-blur-md text-lg text-orange-700 placeholder-orange-700 shadow-sm shadow-amber-700 outline-transparent focus:ring-2 focus:ring-orange-600"
      />
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <img src={searchIcon} alt="Search" className="w-10 h-9" />
      </button>
    </div>
  );
}

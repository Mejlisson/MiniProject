import "./App.css";
import CombinedSearch from "./components/Search/CombinedSearch";
import { MenuProvider } from "./context/menuContext";
import { SearchProvider } from "./context/searchContext";
import HamburgerMenu from "./meny/menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FavoriteBooks from "./meny/Books";
import FavoriteAuthors from "./meny/Authors";
import Reviews from "./meny/Reviews";

function App() {
  return (
    <Router>
      <MenuProvider>
        <SearchProvider>
          <HamburgerMenu />
          <Routes>
            <Route path="/" element={<CombinedSearch />} />
            <Route path="/meny/Books" element={<FavoriteBooks />} />
            <Route path="/meny/Authors" element={<FavoriteAuthors />} />
            <Route path="/meny/Reviews" element={<Reviews />} />
          </Routes>
        </SearchProvider>
      </MenuProvider>
    </Router>
  );
}

export default App;

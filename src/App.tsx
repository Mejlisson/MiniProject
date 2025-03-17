import "./App.css";
import CombinedSearch from "./components/Search/CombinedSearch";
import { MenuProvider } from "./context/menuContext";
import { SearchProvider } from "./context/searchContext";
import HamburgerMenu from "./meny/menu";

function App() {
  return (
    <>
      <MenuProvider>
        <SearchProvider>
          <HamburgerMenu />
          <CombinedSearch />
        </SearchProvider>
      </MenuProvider>
    </>
  );
}

export default App;



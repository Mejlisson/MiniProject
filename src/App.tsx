import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Pages & Layouts
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import AuthorPage from "./pages/AuthorPage";
import AboutPage from "./pages/AboutPage";
import FavoritPage from "./pages/FavoritBookPage";
import RootLayout from "./layouts/RootLayout";
import FavoriteAuthorsPage from "./widgets/FavoritAuthor/FavoriteAuthorsPage";
import RatingPage from "./pages/RatingPage";

// Context Providers
import { MenuProvider } from "./context/MenuContext";
import { FavoriteProvider } from "./widgets/FavoritBook/FavoritBookContext";
import { RatingProvider } from "./context/RatingContext";

// Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "book/:bookKey/:bookSlug", element: <BookPage /> },
      { path: "author/:authorName", element: <AuthorPage /> },
      { path: "favorite-authors", element: <FavoriteAuthorsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "favorites", element: <FavoritPage /> },
      { path: "rating", element: <RatingPage /> },
    ],
  },
]);

function App() {
  return (
    <MenuProvider>
      <FavoriteProvider>
        <RatingProvider>
          <RouterProvider router={router} />
        </RatingProvider>
      </FavoriteProvider>
    </MenuProvider>
  );
}

export default App;

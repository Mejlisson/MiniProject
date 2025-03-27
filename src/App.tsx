import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Pages & Layouts
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import AuthorPage from "./pages/AuthorPage";
import AboutPage from "./pages/AboutPage";
import FavoritPage from "./widgets/FavoritBook/FavoritBookPage";
import RootLayout from "./layouts/RootLayout";

// Context Providers
import { MenuProvider } from "./context/MenuContext";
import { FavoriteProvider } from "./widgets/FavoritBook/FavoritBookContext";

// Routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "book/:bookKey/:bookSlug", element: <BookPage /> },
      { path: "author/:authorKey", element: <AuthorPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "favorites", element: <FavoritPage /> },
    ],
  },
]);

function App() {
  return (
    <MenuProvider>
      <FavoriteProvider>
        <RouterProvider router={router} />
      </FavoriteProvider>
    </MenuProvider>
  );
}

export default App;

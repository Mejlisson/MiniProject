import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookPage from "./pages/BookPage";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AuthorPage from "./pages/AuthorPage";
import AboutPage from "./pages/AboutPage";
import "./App.css";
import { MenuProvider } from "./context/menuContext";
import FavoritPage from "./widgets/FavoritBook/FavoritBookPage";
import { FavoriteProvider } from "./widgets/FavoritBook/FavoritBookContext";//FavoriteProvider


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

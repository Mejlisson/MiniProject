import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookPage from "./pages/BookPage";
import RootLayout from "./layouts/RootLayout";
import HomePage from "./pages/HomePage";
import AuthorPage from "./pages/AuthorPage";
import "./App.css";
import { MenuProvider } from "./context/MenuContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "book/:bookKey/:bookSlug", element: <BookPage /> }, // Matchar både bookKey och bookSlug
      { path: "author/:authorKey", element: <AuthorPage /> }, // Lägg till författarens sida
    ],
  },
]);

function App() {
  return (
    <MenuProvider>
      <RouterProvider router={router} />
    </MenuProvider>
  );
}

export default App;

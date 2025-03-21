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
        { path: "book/:bookTitleSlug", element: <BookPage /> }, // Dynamisk ruta för bok
      { path: "author/:id", element: <AuthorPage /> },
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

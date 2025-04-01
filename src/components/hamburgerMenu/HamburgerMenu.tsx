import { useContext, useEffect, useRef } from "react";
import { MenuContext } from "../../context/MenuContext";
import { Link, useNavigate } from "react-router-dom";

export default function HamburgerMenu() {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error("MenuContext must be used within a MenuProvider");
  }
  const { isOpen, setIsOpen } = menuContext;
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, setIsOpen]);

  return (
    <nav className="fixed w-full bg-[#fff] p-4 flex items-center justify-between h-20 shadow-md">
      <div className="flex items-center space-x-4">
        <img src="/LogoOwl.png" alt="Logo" className="h-17 w25" />
        <Link to={"/"}>
          <h1 className="font-ravi text-4xl text-gray-800">Open Library</h1>
        </Link>
      </div>
      <div className="flex items-center justify-end">
        {/* Home-knapp */}
        <button
          onClick={() => {
            setIsOpen(false); // Stänger menyn om den är öppen
            navigate("/"); // Navigerar till startsidan
          }}
          className="pr-3 font-ravi text-4xl hover:underline hover:bg-[#507B7C]"
        >
          Home
        </button>

        {/* Meny-knapp */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black focus:outline-none relative"
        >
          {isOpen ? (
            <img src="CloseMenu.png" alt="Close Menu" className="h-8 w-8" />
          ) : (
            <img
              src="/MenyIcon.png"
              alt="Open menu"
              className="h-10 w-14 object-fill"
            />
          )}
        </button>

        {/* Dropdown-menyn */}
        {isOpen && (
          <div className="bg-black/55 z-1000 fixed inset-0 w-screen h-screen">
            <div ref={menuRef} onClick={(e) => e.stopPropagation()}>
              <div className="absolute right-0  w-50 h-screen bg-[#507B7C] rounded-md shadow-lg z-50">
                <ul className="flex flex-col text-white font-ravi">
                  <li
                    // to="/menu/Books"
                    className="hover:bg-gray-700 p-4"
                  >
                    <Link to="/favorites" onClick={() => setIsOpen(false)}>
                      {" "}
                      {/*Stänger menyn vid klick*/}
                      Favorite Books
                    </Link>
                  </li>

                  {/*to="/menu/Authors"*/}
                  <li className="hover:bg-gray-700 p-4">
                    <Link to="/favorite-authors" onClick={() => setIsOpen(false)}>
                      Favorite Authors
                    </Link>
                  </li>

                  <Link
                    to="/rating"
                    // to="/menu/Reviews"
                    className="hover:bg-gray-700 p-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Reviews
                  </Link>
                  <img
                    src="/giphy (1).gif"
                    alt="gif icon"
                    className=" w-30 h-30 mx-auto p-2"
                  />
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

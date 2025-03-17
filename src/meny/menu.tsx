import { useContext, useEffect, useRef } from "react";
import { MenuContext } from "../context/menuContext";
import "./style.css";

export default function HamburgerMenu() {
  const menuContext = useContext(MenuContext);
  if (!menuContext) {
    throw new Error("MenuContext must be used within a MenuProvider");
  }
  const { isOpen, setIsOpen } = menuContext;
  const menuRef = useRef<HTMLDivElement>(null);

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
        <img src="LogoOwl.png" alt="Logo" className="h-17 w25" />
        <h1 className="font-ravi text-4xl text-gray-800">Open Library</h1>
      </div>
      <div className="flex items-center justify-end">
        <h2 className="pr-3 font-ravi text-4xl hover:underline hover:bg-[#507B7C]">
          Home
        </h2>
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
          {/* Dropdown menu */}
          {isOpen && (
            <div
              ref={menuRef}
              className="bg-black/55 z-1000 fixed inset-0 w-screen h-screen"
            >
              <div className="absolute right-0 mt-2 w-50 h-screen bg-[#507B7C] rounded-md shadow-lg z-50">
                <ul className="flex flex-col text-white font-ravi">
                  <li className="p-4 hover:bg-gray-700">
                    <a href="#">Favorite Böcker</a>
                  </li>
                  <li className="p-4 hover:bg-gray-700">
                    <a href="#">Favorite Författare</a>
                  </li>
                  <li className="p-4 hover:bg-gray-700">
                    <a href="#">Recenserade</a>
                  </li>
                  <img
                    src="giphy (1).gif"
                    alt="gif icon"
                    className=" w-30 h-30 mx-auto p-2"
                  />
                </ul>
              </div>
            </div>
          )}
        </button>
      </div>
    </nav>
  );
}

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HamburgerMenu from "../components/hamburgerMenu/HamburgerMenu"; 
import Footer from "../components/footer/footer"; 

const RootLayout = () => {
  const [hasVisitedHome, setHasVisitedHome] = useState(() => {
    return localStorage.getItem("hasVisitedHome") === "true";
  });

  useEffect(() => {
    if (!hasVisitedHome) {
      setHasVisitedHome(true);
      localStorage.setItem("hasVisitedHome", "true");
    }
  }, [hasVisitedHome]);

  return (
    <div className="flex flex-col min-h-screen">
      <HamburgerMenu />

      {/* Huvudinnehåll */}
      <main className="flex-grow">
        {hasVisitedHome ? <Outlet /> : <HomePage />}
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;

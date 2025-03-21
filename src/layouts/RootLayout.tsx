import HamburgerMenu from "../components/hamburgerMenu/HamburgerMenu";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="layout">
      {/* HamburgerMenu at the top */}
      <HamburgerMenu />

      {/* Main content area */}
      <main className="content">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default RootLayout;

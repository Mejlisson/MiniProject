import HamburgerMenu from "../components/hamburgerMenu/HamburgerMenu";
import Footer from "../components/footer/footer";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="layout">
      <HamburgerMenu />

      {/* Main content area */}
      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;

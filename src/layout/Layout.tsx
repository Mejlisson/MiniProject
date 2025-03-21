import { Outlet } from "react-router-dom";
import HamburgerMenu from "../meny/menu";
import Footer from "../components/footer/footer";

export default function Layout() {
  return (
    <>
      <HamburgerMenu />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

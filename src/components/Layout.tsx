import { Outlet } from "react-router-dom";
import HamburgerMenu from "../meny/menu";

export default function Layout() {
  return (
    <>
      <HamburgerMenu />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

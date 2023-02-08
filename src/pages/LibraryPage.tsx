import { Outlet, useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";

function LibraryPage() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/library" ? (
        <div className="text-white text-center p-20 font-bold text-2xl">
          WELCOME TO POKEDEX LIBRARY CHOOSE YOUR GENERATION BELOW!
        </div>
      ) : null}
      <Paginate />
      <Outlet />
    </div>
  );
}

export default LibraryPage;

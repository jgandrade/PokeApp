import { Outlet, useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import { useEffect, useState } from "react";
import Search from "../components/Search";

function LibraryPage() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/library" ? (
        <div className="text-white text-center p-20 font-bold text-3xl">
          WELCOME TO POKEDEX LIBRARY CHOOSE YOUR GENERATION BELOW!
        </div>
      ) : null}
      <Search />
      <Paginate />
      <Outlet />
    </div>
  );
}

export default LibraryPage;

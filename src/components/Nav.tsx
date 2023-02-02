import React from "react";
import useDetails from "../hooks/useDetails";
import Search from "./Search";

function Nav() {
  const { name, image } = useDetails();

  return (
    <nav className="flex w-screen h-12 justify-between items-center px-40 bg-red-300">
      <h1>PokeApp</h1>
      <Search />
      <ul className="flex gap-5">
        <li>Home</li>
        <li>Library</li>
        <li>Favorites</li>
      </ul>
      <div className="flex gap-1">
        {typeof image === "function" ? (
          image({ size: 25 })
        ) : (
          <img src="" alt="profile-photo" />
        )}
        <p>{name}</p>
      </div>
    </nav>
  );
}

export default Nav;

import React from "react";
import useDetails from "../hooks/useDetails";
import Search from "./Search";
import { Link } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
function Nav() {
  const { name, image } = useDetails();

  return (
    <nav className="flex h-12 justify-between items-center px-40 bg-red-500 text-white font-bold">
      <h1>PokeApp</h1>
      <Search />
      <ul className="flex gap-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/library/1">Library</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
      <div className="flex gap-1">
        {image === "" ? (
          <IoMdPerson size={25} />
        ) : (
          <img src="" alt="profile-photo" />
        )}
        <p>{name}</p>
        <button>Login</button>
      </div>
    </nav>
  );
}

export default Nav;

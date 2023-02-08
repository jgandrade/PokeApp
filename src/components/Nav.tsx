import React from "react";
import useDetails from "../hooks/useDetails";
import Search from "./Search";
import { NavLink } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import pokeheader from "../assets/pokeball_header.png";
import favorites from "../assets/favorites_nav.png";
import home from "../assets/home_nav.png";
import cards from "../assets/cards_nav.png";
import "../styles/login_btn.css";

function Nav() {
  const { name, image } = useDetails();

  return (
    <nav className="flex h-12 z-50 w-screen justify-between items-center scale-90 md:scale-100 md:px-40 text-white font-bold pt-9 fixed top-0">
      <div className="flex gap-1 justify-center items-center mix-blend-difference">
        <img className="w-12" src={pokeheader} alt="poke-header" />
        <h1 className="text-[#F15B6C] ">Pokédex</h1>
      </div>
      <ul className="flex bg-[#222222] px-5 py-3 gap-5 rounded-xl border border-[#222222]">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/"
          >
            <img
              src={home}
              alt="pokeball"
              loading="lazy"
              className="w-8 hover:scale-125 transition-all"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/library"
          >
            <img
              src={cards}
              alt="cards"
              loading="lazy"
              className="w-8 hover:scale-125 transition-all"
            />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "inactive")}
            to="/favorites"
          >
            <img
              src={favorites}
              alt="favorites"
              loading="lazy"
              className="w-8 hover:scale-125 transition-all"
            />
          </NavLink>
        </li>
      </ul>
      <div className="buttons">
        <button className="btn">
          <span></span>
          <p
            data-start="good luck!"
            data-text="Sign In"
            data-title="Catch Em"
          ></p>
        </button>
      </div>
    </nav>
  );
}

export default Nav;

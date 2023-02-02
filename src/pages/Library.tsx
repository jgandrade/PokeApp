import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../api/axios";
import { setPokemons } from "../redux/pokemonSlice";
import usePokemons from "../hooks/usePokemons";
import Paginate from "../components/Paginate";

function Library() {
  const dispatch = useDispatch();
  const { count, pages } = usePokemons();

  useEffect(() => {
    async function getPokemons() {
      dispatch(
        setPokemons({
          count: 1008,
          pages: Math.ceil(1008 / 100),
        })
      );
    }

    getPokemons();
  }, []);

  return (
    <div className="p-10">
      <Paginate totalPages={pages} />
      <Outlet />
    </div>
  );
}

export default Library;

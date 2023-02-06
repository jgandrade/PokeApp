import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import usePokemons from "../hooks/usePokemons";
import { useParams } from "react-router-dom";
import { useGetPokemonSpeciesInGenerationQuery } from "../redux/pokeApi";
import axios from "../api/axios";
import { setPokemons, setPrevPage } from "../redux/pokemonSlice";
import sort from "../functions/quicksort";
import PokemonCard from "../components/PokemonCard";
import Paginate from "../components/Paginate";

function Library() {
  const { page } = useParams();
  const { data, isFetching } = useGetPokemonSpeciesInGenerationQuery(
    Number(page)
  );

  if (isFetching) {
    return (
      <>
        <p className="font-bold">Loading...</p>
        <img width={70} src="../../public/poke_ball.gif" alt="loading-gif" />
      </>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <div className="grid grid-cols-3 gap-5">
        {data?.map((e: any) => (
          <PokemonCard key={e.id} {...e} />
        ))}
      </div>
      )
    </div>
  );
}

export default Library;

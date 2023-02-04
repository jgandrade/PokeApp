import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import usePokemons from "../hooks/usePokemons";
import { useParams } from "react-router-dom";
import { useGetPokemonSpeciesInGenerationQuery } from "../redux/pokeApi";
import axios from "../api/axios";
import { setPokemons } from "../redux/pokemonSlice";
import sort from "../functions/quicksort";
import Loader2 from "../components/Loader2";
import PokemonCard from "../components/PokemonCard";

function Library() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { page } = useParams();
  const { pageData } = usePokemons();
  const { data } = useGetPokemonSpeciesInGenerationQuery(Number(page));

  const updateLibrary = useCallback(async () => {
    setLoading(true);
    const pokemonData = sort(data?.pokemon_species)?.map(async (e: any) => {
      const id = e?.url?.match(/pokemon-species\/(\d+)/)[1];
      const response = await axios.get(`/pokemon/${id}`);
      const specieData = await response.data;
      return specieData;
    });

    dispatch(setPokemons([...pageData, ...(await Promise.all(pokemonData))]));
    setLoading(false);
  }, [data]);

  useEffect(() => {
    if (data) {
      updateLibrary();
    }
  }, [data, updateLibrary]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-wrap justify-center items-center gap-5">
        {pageData.map((e: any) => (
          <PokemonCard key={e.id} {...e} />
        ))}
      </div>
      {loading && (
        <>
          <p className="font-bold">Loading...</p>{" "}
          <img width={70} src="../../public/poke_ball.gif" alt="loading-gif" />
        </>
      )}
    </div>
  );
}

export default Library;

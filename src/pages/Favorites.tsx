import React, { useCallback, useEffect, useState } from "react";
import useDetails from "../hooks/useDetails";
import axios from "../api/axios";
import PokemonCard from "../components/PokemonCard";
import { Navigate } from "react-router-dom";

function Favorites() {
  const [pokemonDatas, setPokemonDatas] = useState<any>([]);
  const { id, favorites } = useDetails();

  const getPokemonDatas = useCallback(async () => {
    const promises = favorites.map(async (e: any) => {
      const data = await axios.get(`/pokemon/${e}`);
      return data.data;
    });
    setPokemonDatas(await Promise.all(promises));
  }, [favorites]);

  useEffect(() => {
    getPokemonDatas();
  }, [id, favorites, getPokemonDatas]);

  return (
    <>
      {id ? (
        <div className="flex flex-wrap justify-center items-center gap-5">
          {pokemonDatas.length > 0 ? (
            pokemonDatas.map((e: any) => {
              return <PokemonCard key={e?.name} {...e} />;
            })
          ) : (
            <div className="text-2xl text-white font-bold">
              Nothing on your favorites
            </div>
          )}
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Favorites;

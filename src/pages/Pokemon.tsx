import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setPokemonData } from "../redux/pokemonSlice";
import usePokemons from "../hooks/usePokemons";
import Loader from "../components/Loader";
import Loader2 from "../components/Loader2";
import { useGetPokemonDataQuery } from "../redux/pokeApi";

function Pokemon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const { data: pokemonData, isFetching } = useGetPokemonDataQuery(name);

  return (
    <div className="min-h-screen min-w-full flex flex-col justify-start items-center">
      {isFetching ? (
        <div className="">
          <Loader2 />
        </div>
      ) : (
        <div>
          <button className="border rounded-full" onClick={() => navigate(-1)}>
            Go Back
          </button>
          {loading ? <Loader /> : null}
          <img
            style={loading ? { display: "none" } : { width: 150 }}
            src={pokemonData?.sprites?.other["official-artwork"]?.front_default}
            alt={name}
            onLoad={() => setLoading(false)}
          />
          <h2 className="font-bold text-center text-3xl">
            {name?.slice(0, 1).toUpperCase().concat(name?.slice(1))}
          </h2>
          <div className="flex gap-5 justify-center items-center">
            {pokemonData?.types?.map((e: any) => {
              return (
                <div key={`${e.type.name}`} className="border">
                  {e?.type?.name.toUpperCase()}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Pokemon;

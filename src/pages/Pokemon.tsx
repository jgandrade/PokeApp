import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { setLoadingData, setPokemonData } from "../redux/pokemonSlice";
import usePokemons from "../hooks/usePokemons";
import Loader from "../components/Loader";
import Loader2 from "../components/Loader2";

function Pokemon() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pokemonData, loadingData } = usePokemons();
  const { name } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchPokemonData = useCallback(async () => {
    dispatch(setLoadingData(true));
    let pokemonData = await axios.get(`/pokemon/${name}`);
    dispatch(setPokemonData(pokemonData.data));
    dispatch(setLoadingData(false));
  }, [name]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData, name]);

  return (
    <div className="min-h-screen min-w-full flex flex-col justify-start items-center">
      {loadingData ? (
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
            src={pokemonData?.sprites?.other?.dream_world?.front_default}
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

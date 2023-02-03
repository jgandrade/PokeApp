import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonData } from "../redux/pokemonSlice";
import usePokemons from "../hooks/usePokemons";
import Loader from "../components/Loader";

function Pokemon() {
  const dispatch = useDispatch();
  const { pokemonData } = usePokemons();
  const { name } = useParams();
  const [loading, setLoading] = useState(true);

  const fetchPokemonData = useCallback(async () => {
    let pokemonData = await axios.get(`/pokemon/${name}`);
    dispatch(setPokemonData(pokemonData.data));
  }, [name]);

  useEffect(() => {
    fetchPokemonData();
  }, [fetchPokemonData, name]);

  return (
    <div>
      {loading ? <Loader /> : null}
      <img
        src={pokemonData?.sprites?.front_default}
        alt={name}
        onLoad={() => setLoading(false)}
      />
      <h2>{name}</h2>
    </div>
  );
}

export default Pokemon;

import { useSelector } from "react-redux";

export default function usePokemons() {
  const { pokemonData} = useSelector((state: any) => state.pokemon);
  return { pokemonData};
}

import { useSelector } from "react-redux";

export default function usePokemons() {
  const { pageData, pokemonData } = useSelector((state: any) => state.pokemon);
  return { pageData, pokemonData };
}

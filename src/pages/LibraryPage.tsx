import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PokemonCard } from "../imports/__import_to_app__";
import axios from "../api/axios";
import { setPageData } from "../redux/pokemonSlice";
import usePokemons from "../hooks/usePokemons";

function LibraryPage() {
  const dispatch = useDispatch();
  const { pageData } = usePokemons();
  const pokemonDataRef = useRef(() => {});
  const { page } = useParams();

  pokemonDataRef.current = async () => {
    let pokemonDatas = [];
    for (let i = Number(page) * 100 - 100 + 1; i <= Number(page) * 100; i++) {
      try {
        let response = await axios.get(`/pokemon/${i}`);
        pokemonDatas.push(response.data);
      } catch (err) {
        if (err) break;
      }
    }
    dispatch(setPageData(pokemonDatas));
  };

  useEffect(() => {
    pokemonDataRef.current();
  }, [page]);

  return (
    <div className="flex flex-wrap gap-10 justify-center items-center">
      {pageData?.map((e: { name: string; id: number; sprites: any }) => {
        return (
          <PokemonCard
            key={`${e.name}-${e.id}`}
            img={
              e?.sprites?.front_default
                ? e?.sprites?.front_default
                : e?.sprites?.other["official-artwork"]?.front_default
            }
            name={e?.name}
            id={e?.id}
          />
        );
      })}
    </div>
  );
}

export default LibraryPage;

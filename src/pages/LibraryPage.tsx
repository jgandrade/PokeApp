import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PokemonCard } from "../imports/__import_to_app__";
import axios from "../api/axios";
import { setPageData } from "../redux/pokemonSlice";
import usePokemons from "../hooks/usePokemons";

function LibraryPage() {
  const dispatch = useDispatch();
  const { page } = useParams();
  const { pageData } = usePokemons();
  const pokemonDataRef = useRef(() => {});

  const pokemonDatas = useCallback(async () => {
    let pokemonDatas = [];
    for (let i = Number(page) * 100 - 100 + 1; i <= Number(page) * 100; i++) {
      if (i === 1009) break;
      try {
        let response = await axios.get(`/pokemon/${i}`);
        pokemonDatas.push(response.data);
      } catch (err) {
        if (err) break;
      }
    }
    dispatch(setPageData(pokemonDatas));
  }, [page]);

  useEffect(() => {
    pokemonDatas();
  }, [page, pokemonDatas]);

  return (
    <div className="flex flex-wrap gap-10 justify-center items-center">
      {pageData?.map((e: { name: string; id: number; sprites: any }) => {
        return (
          <div
            key={`${e.name}-${e.id}`}
            className="w-[25%] flex justify-center items-center"
          >
            <PokemonCard
              img={
                e?.sprites?.front_default
                  ? e?.sprites?.front_default
                  : e?.sprites?.other["official-artwork"]?.front_default
              }
              name={e?.name}
              id={e?.id}
            />
          </div>
        );
      })}
    </div>
  );
}

export default LibraryPage;

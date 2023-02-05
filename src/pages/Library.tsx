import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import usePokemons from "../hooks/usePokemons";
import { useParams } from "react-router-dom";
import { useGetPokemonSpeciesInGenerationQuery } from "../redux/pokeApi";
import axios from "../api/axios";
import { setPokemons, setPrevPage } from "../redux/pokemonSlice";
import sort from "../functions/quicksort";
import PokemonCard from "../components/PokemonCard";

function Library() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonDatas, setPokemonDatas] = useState<any[]>([]);
  const { page } = useParams();
  const { pageData, prevPage } = usePokemons();
  const { data } = useGetPokemonSpeciesInGenerationQuery(Number(page));
  const currentRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const controller = new AbortController();

  const updatePokemonDatas = useCallback(() => {
    if (data) {
      setPokemonDatas(sort(data?.pokemon_species));
    }
  }, [data]);

  const updateLibrary = useCallback(async () => {
    setLoading(true);
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    let allData: any[] = [];
    for (let i = currentRef.current; i < currentRef.current + 30; i++) {
      if (i === pokemonDatas.length) break;
      const id = pokemonDatas[i]?.url?.match(/pokemon-species\/(\d+)/)[1];
      const response = await axios.get(`/pokemon/${id}`, {
        signal: controller.signal,
      });
      const specieData = await response.data;
      allData.push(specieData);
    }

    dispatch(setPokemons([...pageData, ...(await Promise.all(allData))]));
    currentRef.current = currentRef.current + 30;
    setLoading(false);
  }, [pageData, pokemonDatas]);

  useEffect(() => {
    let cancelFetch = false;

    if (!cancelFetch) {
      if (prevPage !== page) {
        dispatch(setPrevPage(page));
        dispatch(setPokemons([]));
      } else {
        if (pageData.length === 0) {
          if (pokemonDatas.length === 0 && data) {
            updatePokemonDatas();
          }
          if (pokemonDatas.length > 0) {
            updateLibrary();
          }
        } else {
          currentRef.current = pageData.length;
        }
      }
    }

    console.log(prevPage === page, prevPage, page);
    return () => {
      cancelFetch = true;
    };
  }, [page, pokemonDatas, data]);

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <div ref={scrollRef} className="grid grid-cols-3 gap-5">
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
      {pokemonDatas.length > 0 || pageData.length > 0 ? (
        pageData.length ===
        data.pokemon_species.length ? null : pageData.length > 0 ? (
          <button onClick={updateLibrary} disabled={loading}>
            Load More
          </button>
        ) : null
      ) : null}
    </div>
  );
}

export default Library;

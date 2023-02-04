import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PokemonCard } from "../imports/__import_to_app__";
import Loader2 from "../components/Loader2";
import Error from "../components/Error";
import { useGetPokemonSpeciesInGenerationQuery } from "../redux/pokeApi";
import sort from "../functions/quicksort";
import Paginate from "../components/Paginate";

function DisplayPokemonCard(pokemonDatas: any[]): any {
  return sort(pokemonDatas)?.map(
    (e: { name: string; url: string }, i: number) => {
      const match = e?.url.match(/species\/(\d+)/);
      let id = "";
      if (match) {
        id = match[1];
      }
      return (
        <div
          key={`${e.name}-${i}`}
          className="w-[25%] flex justify-center items-center"
        >
          <PokemonCard
            name={e?.name}
            id={Number(id)}
            img={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          />
        </div>
      );
    }
  );
}

function LibraryPage() {
  const { page } = useParams();
  const pageNumber = useMemo(() => page, [page]);

  const { data, isFetching, error } = useGetPokemonSpeciesInGenerationQuery(
    Number(pageNumber)
  );

  if (isFetching) return <Loader2 />;
  if (error) return <Error err={error} />;

  return (
    <div>
      <Paginate />
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {DisplayPokemonCard(data?.pokemon_species)}
      </div>
    </div>
  );
}

export default LibraryPage;

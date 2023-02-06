import { useParams } from "react-router-dom";
import { useGetPokemonSpeciesInGenerationQuery } from "../redux/pokeApi";
import PokemonCard from "../components/PokemonCard";

function Library() {
  const { page } = useParams();
  const { data, isFetching } = useGetPokemonSpeciesInGenerationQuery(
    Number(page)
  );

  if (isFetching) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-5rem)]">
        <p className="font-bold">Loading...</p>
        <img width={70} src="/poke_ball.gif" alt="loading-gif" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <div className="grid grid-cols-3 gap-5">
        {data?.map((e: any) => (
          <PokemonCard key={e.id} {...e} />
        ))}
      </div>
    </div>
  );
}

export default Library;

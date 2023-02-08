import { useParams } from "react-router-dom";
import { useGetPokemonSpeciesInGenerationQuery } from "../redux/pokeApi";
import PokemonCard from "../components/PokemonCard";
import loadingpokeball from "../assets/poke_ball.gif";

function Library() {
  const { page } = useParams();
  const { data, isFetching } = useGetPokemonSpeciesInGenerationQuery(
    Number(page)
  );
    
  if (isFetching) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-10.5rem)]">
        <p className="font-bold text-white">Loading...</p>
        <img width={70} src={loadingpokeball} alt="loading-gif" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-5">
      <div className="flex justify-center items-center flex-wrap gap-5">
        {data?.map((e: any) => (
          <PokemonCard key={e.id} {...e} />
        ))}
      </div>
    </div>
  );
}

export default Library;

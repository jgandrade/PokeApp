import { useParams } from "react-router-dom";
import { useGetPokemonSpeciesInGenerationQuery } from "../redux/pokeApi";
import PokemonCard from "../components/PokemonCard";
import LoadingComponents from "../components/LoadingComponents";

function Library() {
  const { page } = useParams();
  const { data, isFetching } = useGetPokemonSpeciesInGenerationQuery(
    Number(page)
  );

  if (isFetching) {
    return (
      <div className="flex flex-wrap gap-5 justify-center items-center p-5">
        {Array.from(Array(30).keys()).map((e) => {
          return <LoadingComponents />;
        })}
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

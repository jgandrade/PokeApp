import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";

type PokemonCard = {
  name: string;
  id: number;
  img: string;
};

function PokemonCard({ name, id, img }: PokemonCard) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col justify-center items-stretch border rounded shadow-md min-w-[180px] min-h-[210px] max-h-[210px] max-w-[180px] p-2">
      {loading ? (
        <div className="min-h-[150px] max-h-[150px] min-w-[150px] max-w-[150px] flex justify-center items-center">
          <Loader />
        </div>
      ) : null}
      <img
        className="min-h-[150px] max-h-[150px] min-w-[150px]"
        style={loading ? { display: "none" } : {}}
        src={img}
        alt={`${id}-img`}
        onLoad={() => setLoading(false)}
      />
      <p className="font-bold text-red-400 self-center">{id}. {name.toUpperCase()}</p>
    </div>
  );
}

export default PokemonCard;

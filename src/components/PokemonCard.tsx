import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "../styles/card.css";

type PokemonCard = {
  name: string;
  id: number;
  img: string;
};

function PokemonCard({ name, id, img }: PokemonCard) {
  if (id > 905) {
    img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const toggleFlipCard = () => {
    cardRef.current?.classList.toggle("rotate-card");
  };

  return (
    <div className="flip-card" onClick={() => toggleFlipCard()}>
      <div ref={cardRef} className="flip-card-inner">
        <div className="flip-card-front">
          <div className="flex flex-col justify-center items-stretch border rounded shadow-md min-w-[180px] min-h-[210px] max-h-[210px] max-w-[180px] p-2">
            <Link
              to={`/pokemon/${name}`}
              className="flex justify-center items-center"
            >
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
            </Link>
            <p className="font-bold text-red-400 self-center">
              {id}. {name.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flip-card-back">
          <p className="title">BACK</p>
          <p>Leave Me</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;

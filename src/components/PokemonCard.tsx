import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "../styles/card.css";

function PokemonCard({ sprites, id, name, weight, height }: any) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const toggleFlipCard = useCallback(() => {
    cardRef.current?.classList.toggle("rotate-card");
  }, [cardRef]);

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
                width={20}
                className="min-h-[150px] max-h-[150px] min-w-[150px]"
                style={loading ? { display: "none" } : {}}
                src={sprites?.other["official-artwork"]?.front_default}
                alt={`${id}-img`}
                onLoad={() => setLoading(false)}
              />
            </Link>
            <p className="font-bold self-center">
              {id}. {name?.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flip-card-back">
          <img
            width={100}
            src={`${
              sprites?.versions["generation-v"]["black-white"].animated
                ?.front_default ||
              sprites?.other["official-artwork"]?.front_default
            }`}
            loading="lazy"
          />
          <p className="title">BACK</p>
          <p>Leave Me</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;

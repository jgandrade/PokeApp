import { useCallback, useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import "../styles/card.css";
import { bgType } from "../functions/bgType";

function getType(type: string): { asset1: string; asset2: string } {
  return {
    asset1: `/Types/${type
      .slice(0, 1)
      .toUpperCase()
      .concat(type.slice(1))}.svg`,
    asset2: `/Tag/${type.slice(0, 1).toUpperCase().concat(type.slice(1))}.svg`,
  };
}

function PokemonCard({ sprites, id, name, types }: any) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const toggleFlipCard = useCallback(() => {
    cardRef.current?.classList.toggle("rotate-card");
  }, [cardRef]);

  return (
    <div
      className={`flip-card pokemon-card ${bgType(types[0]?.type.name)}`}
      onClick={() => toggleFlipCard()}
    >
      <div
        ref={cardRef}
        className="flip-card-inner justify-center items-center"
      >
        <div className="flip-card-front bg-[#222222]">
          <div className="flex justify-center items-center bg-[#333333] w-max px-2 py-1 rounded-xl ml-2 mt-3">
            <img
              src={getType(types[0]?.type.name)?.asset1}
              alt="type"
              width={30}
            />
            <p className="text-white font-bold">
              #
              {id.toString().length === 1
                ? `000${id}`
                : id.toString().length === 2
                ? `00${id}`
                : id.toString().length === 3
                ? `0${id}`
                : id.toString().length === 4
                ? id
                : id}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center min-w-[180px] min-h-[210px] max-h-[210px] max-w-[180px] p-2">
            <div className="flex justify-center items-center">
              {loading ? (
                <div className="min-h-[150px] max-h-[150px] min-w-[150px] max-w-[150px] flex justify-center items-center">
                  <Loader />
                </div>
              ) : null}
              <img
                className="min-h-[100px] max-h-[100px] min-w-[100px]"
                style={loading ? { display: "none" } : {}}
                src={sprites?.other["official-artwork"]?.front_default}
                alt={`${id}-img`}
                onLoad={() => setLoading(false)}
              />
            </div>
            <div className="flex flex-col self-start justify-start items-start pt-5">
              <p className="font-bold pl-3 text-white">{name?.toUpperCase()}</p>
              <div className="flex justify-start items-center">
                {types.map((e: any) => {
                  return (
                    <img
                      className="pl-2"
                      src={getType(e?.type.name).asset2}
                      alt="type-img"
                      width={80}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flip-card-back flex flex-col justify-center items-center ">
          <img
            width={100}
            src={`${
              sprites?.versions["generation-v"]["black-white"].animated
                ?.front_default ||
              sprites?.other["official-artwork"]?.front_default
            }`}
            loading="lazy"
          />
          <p className="font-bold">{name.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;

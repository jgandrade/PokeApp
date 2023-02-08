import { useCallback, useRef, useState } from "react";
import "../styles/card.css";
import { bgType } from "../functions/bgType";
import { FaInfoCircle } from "react-icons/fa";
import { GiHealthNormal, GiWingfoot } from "react-icons/gi";
import { BsFillShieldFill } from "react-icons/bs";
import { RiSwordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Puff } from "react-loader-spinner";

export function getType(type: string): { asset1: string; asset2: string } {
  return {
    asset1: `/Types/${type
      .slice(0, 1)
      .toUpperCase()
      .concat(type.slice(1))}.svg`,
    asset2: `/Tag/${type.slice(0, 1).toUpperCase().concat(type.slice(1))}.svg`,
  };
}

function PokemonCard({ sprites, id, name, types, stats }: any) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);
  const toggleFlipCard = useCallback(() => {
    cardRef.current?.classList.toggle("rotate-card");
  }, [cardRef]);

  return (
    <div
      className={`flip-card pokemon-card ${bgType(types[0]?.type.name)}`}
      onMouseLeave={() => cardRef.current?.classList.remove("rotate-card")}
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
            <p className="text-[#d1cece] text-xs font-bold">
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
          <div className="flex flex-col justify-center items-center min-w-[200px] min-h-[210px] max-h-[210px] max-w-[200px] p-2">
            <div className="flex justify-center items-center">
              {loading ? (
                <div className="min-h-[100px] max-h-[100px] min-w-[100px] max-w-[100px] flex justify-center items-center">
                  <Puff
                    height="100"
                    width="100"
                    radius={1}
                    color="#777777"
                    ariaLabel="puff-loading"
                    visible={true}
                  />
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
              <div>
                <p className="font-bold pl-2 text-white">
                  {name?.toUpperCase()}
                </p>
              </div>
              <div className="flex justify-start items-center">
                {types.map((e: any) => {
                  return (
                    <img
                      key={e.type.name}
                      className="pl-1"
                      src={getType(e?.type.name).asset2}
                      alt="type-img"
                      width={90}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <p className="font-bold  bg-[#333333] w-[180px] py-1 rounded-xl text-sm mb-3 flex justify-center items-center relative">
            {name.toUpperCase()}
            <span>
              <Link to={`/pokemon/${name}`}>
                <FaInfoCircle
                  fill="#999999"
                  size={20}
                  className="absolute top-1 right-2"
                />
              </Link>
            </span>
          </p>
          <div className="rounded-full w-30">
            <img
              width={80}
              src={`${
                sprites?.versions["generation-v"]["black-white"].animated
                  ?.front_default ||
                sprites?.other["official-artwork"]?.front_default
              }`}
              loading="lazy"
            />
          </div>
          <div className="self-start flex flex-wrap justify-center items-center text-left text-xs w-full gap-2">
            <div>
              <p className="flex justify-center items-center">
                <GiHealthNormal />{" "}
                <span className="font-normal">{stats[0]?.base_stat}</span>{" "}
              </p>
              <p className="flex justify-center items-center">
                <BsFillShieldFill />{" "}
                <span className="font-normal">{stats[2]?.base_stat}</span>{" "}
              </p>
            </div>
            <div>
              <p className="flex justify-center items-center">
                <RiSwordFill />{" "}
                <span className="font-normal">{stats[1]?.base_stat}</span>{" "}
              </p>
              <p className="flex justify-center items-center">
                <GiWingfoot />{" "}
                <span className="font-normal">{stats[5]?.base_stat}</span>{" "}
              </p>
            </div>
            <div className="flex flex-col justify-start items-center">
              {types.map((e: any) => {
                return (
                  <img
                    key={e.type.name}
                    className="pl-1"
                    src={getType(e?.type.name).asset2}
                    alt="type-img"
                    width={90}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;

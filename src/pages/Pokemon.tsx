import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetPokemonDataQuery } from "../redux/pokeApi";
import { Oval } from "react-loader-spinner";
import PokemonCard, { getType } from "../components/PokemonCard";
import usePokemons from "../hooks/usePokemons";
import romanToNumber from "../functions/numeralConverter";
import { BiLinkExternal } from "react-icons/bi";
import axios from "../api/axios";
import { bgType2 } from "../functions/bgType";
import { FaHeart } from "react-icons/fa";
import { db } from "../firebase/firebase_auth";
import useDetails from "../hooks/useDetails";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../redux/userSlice";
import Swal from "sweetalert2";

function Pokemon() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [evolution, setEvolution] = useState<any>([]);
  const { id, name: userName, photo, favorites } = useDetails();
  const { pokemonData: allSpeciesData } = usePokemons();
  const { data: pokemonData, isFetching } = useGetPokemonDataQuery(
    allSpeciesData
      .find((e: any) => {
        if (name === e?.name) {
          return e;
        }
      })
      ?.url?.split("/")[6] ||
      allSpeciesData
        .find((e: any) => {
          if (name?.includes(e?.name) || e?.name.includes(name)) {
            return e;
          }
        })
        ?.url?.split("/")[6]
  );

  const addToFavorites = useCallback(async () => {
    const docRef = doc(db, "Users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(
        setUserDetails({
          id: id,
          name: userName,
          photo: photo,
          favorites: [...favorites, pokemonData?.id],
        })
      );
      Swal.fire("Pokemon Successfully added to your Favorites");
      return setDoc(doc(db, "Users", id), {
        ...docSnap.data(),
        favorites: [...favorites, pokemonData?.id],
      })
        .then((log) => log)
        .catch((err) => err);
    }
  }, [pokemonData, id]);

  const getEvolutions = useCallback(
    async (ev1: string, ev2: string, ev3: string) => {
      let firstEvolution: any;
      if (ev1 !== undefined) {
        firstEvolution = await axios.get(`/pokemon/${ev1}`);
      }
      let secondEvolution: any;
      if (ev2 !== undefined) {
        secondEvolution = await axios.get(`/pokemon/${ev2}`);
      }
      let thirdEvolution: any;
      if (ev3 !== undefined) {
        thirdEvolution = await axios.get(`/pokemon/${ev3}`);
      }
      setEvolution([
        { ...firstEvolution?.data },
        { ...secondEvolution?.data },
        { ...thirdEvolution?.data },
      ]);
    },
    [pokemonData, name]
  );

  useEffect(() => {
    getEvolutions(
      allSpeciesData
        .find((e: any) => {
          return e.name === pokemonData?.chain?.species?.name;
        })
        ?.url?.split("/")[6],
      allSpeciesData
        .find((e: any) => {
          return e.name === pokemonData?.chain?.evolves_to[0]?.species?.name;
        })
        ?.url?.split("/")[6],
      allSpeciesData
        .find((e: any) => {
          return (
            e.name ===
            pokemonData?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name
          );
        })
        ?.url?.split("/")[6]
    );
  }, [pokemonData, getEvolutions]);

  if (isFetching) {
    return (
      <div className="min-h-screen min-w-full flex flex-col justify-start items-center">
        <div className="">
          <Oval
            height={80}
            width={80}
            color="#F15B6C"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#f1a3ad"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      </div>
    );
  }

  if (
    !allSpeciesData?.some((e: any) => {
      if (name?.includes(e?.name) || e?.name.includes(name)) {
        return true;
      }
    })
  ) {
    return (
      <>
        <p>Not Found</p>
      </>
    );
  }

  return (
    <>
      {pokemonData?.id > pokemonData?.numberOfSpecies ? (
        <div>NOT FOUND</div>
      ) : (
        <div className="min-h-screen min-w-full flex flex-col md:flex-row justify-start items-start relative">
          <section
            id="pokemon"
            className="w-full md:w-6/12 h-70 md:h-screen flex flex-col justify-center items-center md:sticky md:top-20"
          >
            <div className="absolute top-0 left-20 flex justify-center items-center bg-[#333333] w-max px-2 py-1 rounded-xl ml-2 mt-3">
              <img
                src={getType(pokemonData?.types[0]?.type.name)?.asset1}
                alt="type"
                width={30}
              />
              <p className="text-[#d1cece] text-xl font-bold">
                #
                {pokemonData?.id.toString().length === 1
                  ? `000${pokemonData?.id}`
                  : pokemonData?.id.toString().length === 2
                  ? `00${pokemonData?.id}`
                  : pokemonData?.id.toString().length === 3
                  ? `0${pokemonData?.id}`
                  : pokemonData?.id.toString().length === 4
                  ? pokemonData?.id
                  : pokemonData?.id}
              </p>
            </div>

            {id ? (
              favorites?.some((e: any) => e === pokemonData?.id) ? (
                <p className="absolute top-0 right-20 bg-[#333333] text-white text-xl font-bold w-max px-2 py-1 rounded-xl mr-2 mt-3">
                  Favorited
                </p>
              ) : (
                <button
                  className="absolute top-0 right-20 bg-[#333333] text-white text-xl font-bold w-max px-2 py-1 rounded-xl mr-2 mt-3"
                  onClick={addToFavorites}
                >
                  Add to Favorites
                </button>
              )
            ) : null}

            <div className="flex flex-col justify-center items-center relative">
              <img
                className="animate-pop-out relative z-50 w-[140px] md:w-[200px]"
                style={loading ? { display: "none" } : {}}
                src={`${
                  pokemonData?.sprites?.versions["generation-v"]["black-white"]
                    .animated?.front_default ||
                  pokemonData?.sprites?.other["official-artwork"]?.front_default
                }`}
                alt={pokemonData?.name}
                onLoad={() => setLoading(false)}
              />
              <div
                className={`w-full h-24 ${bgType2(
                  pokemonData?.types[0]?.type?.name
                ).toString()} blur-3xl relative z-10 top-[-15%]`}
              ></div>
            </div>
            <h2 className="font-bold text-center text-3xl text-white relative z-50">
              {pokemonData?.name
                ?.slice(0, 1)
                .toUpperCase()
                .concat(pokemonData?.name?.slice(1))}
            </h2>
          </section>
          <section
            id="stats"
            className="flex flex-col justify-center items-center w-full md:w-6/12"
          >
            <div className="flex flex-col justify-start w-9/12 rounded-lg bg-[#333333] border border-zinc-600 p-5 text-white">
              <p className="italic font-semibold text-xl text-center text-zinc-300 mb-7">
                "
                {pokemonData?.flavor_text_entries[0]?.flavor_text ||
                  "There are no current entries for this pokemon"}
                "
              </p>
              <h3 className="font-bold text-md pl-2 pb-2">Pokemon Type</h3>
              <div className="flex justify-start items-center">
                {pokemonData?.types.map((e: any) => {
                  return (
                    <img
                      key={e.type.name}
                      className="pl-1"
                      src={getType(e?.type.name).asset2}
                      alt="type-img"
                    />
                  );
                })}
              </div>
              <div className="flex w-full self-center rounded-lg bg-[#444444] border border-zinc-600 p-5 text-white mt-5">
                <div className="flex flex-col gap-5 w-6/12">
                  <div>
                    <p className="font-bold text-zinc-300 text-md">HP</p>
                    <p className="text-md font-semibold">
                      {pokemonData?.stats[0].base_stat}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-300 text-md">Defense</p>
                    <p className="text-md font-semibold">
                      {pokemonData?.stats[2].base_stat}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-300 text-md">
                      Special Defense
                    </p>
                    <p className="text-md font-semibold">
                      {pokemonData?.stats[4].base_stat}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 w-6/12">
                  <div>
                    <p className="font-bold text-zinc-300 text-md">Attack</p>
                    <p className="text-md font-semibold">
                      {pokemonData?.stats[1].base_stat}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-300 text-md">Speed</p>
                    <p className="text-md font-semibold">
                      {pokemonData?.stats[5].base_stat}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-300 text-md">
                      Special Attack
                    </p>
                    <p className="text-md font-semibold">
                      {pokemonData?.stats[3].base_stat}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex w-full self-center rounded-lg bg-[#444444] border border-zinc-600 p-5 text-white mt-5">
                <div className="flex flex-col gap-5 w-6/12">
                  <div>
                    <p className="font-bold text-zinc-300 text-md">Height</p>
                    <p className="text-md font-semibold">
                      {((pokemonData?.height / 10) * 3.28).toFixed(2)}m
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-300 text-md">Weight</p>
                    <p className="text-md font-semibold">
                      {pokemonData?.weight / 10}kg
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 w-6/12">
                  <div>
                    <p className="font-bold text-zinc-300 text-md">Category</p>
                    <p className="text-md font-semibold">
                      {pokemonData?.genera[7]?.genus}
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-zinc-300 text-md">
                      Generation
                    </p>
                    <Link
                      to={`/library/${romanToNumber(
                        pokemonData?.generation?.name
                          .split("-")[1]
                          .toUpperCase()
                      ).toString()}`}
                    >
                      <p className="flex justify-start gap-2 items-center text-md font-semibold">
                        {pokemonData?.generation?.name.toUpperCase()}{" "}
                        <span>
                          <BiLinkExternal />
                        </span>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-md pl-2 pb-2 mt-5">Abilities</h3>
              <div>
                {pokemonData?.abilities?.map((e: any) => {
                  return (
                    <div
                      key={e?.ability?.name}
                      className="ml-2 px-3 py-2 border rounded mb-3"
                    >
                      {e?.ability?.name
                        .slice(0, 1)
                        .toUpperCase()
                        .concat(e?.ability?.name?.slice(1))}
                    </div>
                  );
                })}
              </div>
              <h3 className="font-bold text-md pl-2 pb-2 mt-5">Evolutions</h3>
              <div className="flex flex-col justify-center items-center gap-5">
                {evolution[0]?.name
                  ? evolution?.map((e: any) => {
                      return (
                        <div key={e?.name + "keys"}>
                          {e?.name && <PokemonCard {...e} />}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Pokemon;

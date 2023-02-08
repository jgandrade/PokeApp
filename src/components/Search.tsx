import { useCallback, useEffect, useState } from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/search.css";

function Search() {
  const [pokemons, setPokemons] = useState<null | undefined | any[]>([]);
  const [toSearch, setToSearch] = useState<string>("");
  const [searchReturns, setSearchReturns] =
    useState<{ name: string; url: string }[]>();
  const [search, setSearch] = useState<string>("");

  const getData = useCallback(async () => {
    const data = await axios.get("/pokemon?limit=100000&offset=0");
    setPokemons(data.data?.results);
  }, []);

  function handleChange(event: any) {
    setSearch(event?.target?.value);
  }

  useEffect(() => {
    let delay = 1000;
    let timeout: any;
    timeout = setTimeout(() => {
      setToSearch(search);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    if (toSearch?.length > 0) {
      const dataSearch = pokemons?.filter((e) => {
        return e?.name.includes(toSearch.toLowerCase());
      });
      setSearchReturns(dataSearch);
    } else setSearchReturns([]);
  }, [toSearch]);

  useEffect(() => {
    let isFetching = true;
    getData();
    return () => {
      isFetching = false;
    };
  }, []);

  return (
    <div className="flex flex-col relative justify-center items-center mb-10">
      <input
        className="transition rounded w-5/12 h-12 border-none ease-in-out bg-[#222222] text-white text-2xl font-bold px-3 py-3 outline-none"
        type="text"
        name="search"
        onChange={handleChange}
        value={search}
        placeholder="Search your pokemon here"
      />
      <div
        className={`${
          toSearch.length > 0
            ? `scrollbar absolute w-5/12 ${
                searchReturns
                  ? searchReturns?.length <= 15
                    ? "h-max"
                    : "h-[25vw]"
                  : null
              }  overflow-x-hidden bg-[#333333] top-[125%] z-50 text-white rounded`
            : "hidden"
        }`}
      >
        {toSearch.length > 0 && searchReturns?.length === 0 ? (
          <p className="text-white px-5 py-1 font-bold">No Results Found</p>
        ) : (
          searchReturns?.map((e) => {
            return (
              <div
                key={e.name + "-key"}
                className="transition hover:bg-[#444444] px-5 py-1"
              >
                <Link to={`/pokemon/${e.name}`}>
                  <p className="text-white">{e.name.toUpperCase()}</p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Search;

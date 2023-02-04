import React, { useCallback, useMemo } from "react";
import Page from "./Page";
import { useGetPokemonSpeciesByGenerationQuery } from "../redux/pokeApi";

function Paginate() {
  const { data } = useGetPokemonSpeciesByGenerationQuery();

  const displayPagesButton = useCallback(() => {
    let buttons = [];
    for (let i = 1; i <= data?.count; i++) {
      buttons.push(<Page key={`page-${i}`} page={i} />);
    }
    return buttons;
  }, [data]);

  const buttons = useMemo(() => displayPagesButton(), [displayPagesButton]);

  return (
    <div className="flex justify-center items-center gap-1 pb-5">
      {buttons.map((e) => {
        return e;
      })}
    </div>
  );
}

export default Paginate;

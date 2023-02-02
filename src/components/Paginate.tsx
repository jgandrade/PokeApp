import React from "react";
import Page from "./Page";

function Paginate({ totalPages }: { totalPages: number }) {
  function displayPagesButton() {
    let buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(<Page key={`page-${i}`} page={i} />);
    }

    return buttons;
  }

  const buttons = displayPagesButton();

  return (
    <div className="flex justify-center items-center gap-1 pb-5">
      {buttons.map((e) => {
        return e;
      })}
    </div>
  );
}

export default Paginate;

import React from "react";
import { Link } from "react-router-dom";

function Page({ page }: { page: number }) {
  return (
    <Link to={`/library/${page}`} className="border w-10 text-center">
      {page}
    </Link>
  );
}

export default Page;

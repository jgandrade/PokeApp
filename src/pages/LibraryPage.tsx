import React from "react";
import { Outlet } from "react-router-dom";
import Paginate from "../components/Paginate";

function LibraryPage() {
  return (
    <div>
      <Paginate />
      <Outlet />
    </div>
  );
}

export default LibraryPage;

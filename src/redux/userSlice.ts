import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  name: string;
  favorites: {
    pokemonName: string;
    url: string;
  }[];
};

const initialState: initStateType = {
  name: "",
  favorites: [],
};


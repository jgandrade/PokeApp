import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  count: number;
  pages: number;
  pageData: [];
};

const initialState: initStateType = {
  count: NaN,
  pages: NaN,
  pageData: [],
};

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.count = action.payload.count;
      state.pages = action.payload.pages;
    },
    setPageData: (state, action) => {
      state.pageData = action.payload;
    },
  },
});

export const { setPokemons, setPageData } = pokemonSlice.actions;

export default pokemonSlice.reducer;

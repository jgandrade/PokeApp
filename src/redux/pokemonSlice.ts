import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  count: number;
  pages: number;
  pageData: [];
  pokemonData: {};
};

const initialState: initStateType = {
  count: NaN,
  pages: NaN,
  pageData: [],
  pokemonData: {},
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
    setPokemonData: (state, action) => {
      state.pokemonData = action.payload;
    },
  },
});

export const { setPokemons, setPageData, setPokemonData } = pokemonSlice.actions;

export default pokemonSlice.reducer;

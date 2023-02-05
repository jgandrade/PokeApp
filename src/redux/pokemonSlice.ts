import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  pageData: {}[];
  pokemonData: {};
  prevPage: number;
};

const initialState: initStateType = {
  pageData: [],
  pokemonData: {},
  prevPage: 1,
};

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemons: (state, action) => {
      state.pageData = action.payload;
    },
    setPokemonData: (state, action) => {
      state.pokemonData = action.payload;
    },
    setPrevPage: (state, action) => {
      state.prevPage = action.payload;
    },
  },
});

export const { setPokemons, setPokemonData, setPrevPage } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;

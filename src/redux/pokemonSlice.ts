import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  pageData: [];
  pokemonData: {};
};

const initialState: initStateType = {
  pageData: [],
  pokemonData: {},
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
  },
});

export const { setPokemons, setPokemonData } = pokemonSlice.actions;

export default pokemonSlice.reducer;

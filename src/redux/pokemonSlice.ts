import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  pokemonData: {}[];
};

const initialState: initStateType = {
  pokemonData: [],
};

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {
    setPokemonData: (state, action) => {
      state.pokemonData = action.payload;
    },
  },
});

export const { setPokemonData } = pokemonSlice.actions;

export default pokemonSlice.reducer;

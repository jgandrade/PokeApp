import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import pokemonReducer from "./pokemonSlice";
import { pokeApi } from "./pokeApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    pokemon: pokemonReducer,
    [pokeApi.reducerPath]: pokeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(pokeApi.middleware);
  },
});

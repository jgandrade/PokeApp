import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokeApi = createApi({
  reducerPath: "pokeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_POKEMON_URL,
  }),
  endpoints: (builder) => ({
    getPokemonSpeciesByGeneration: builder.query<any, void>({
      query: () => `/generation`,
    }),
    getPokemonSpeciesInGeneration: builder.query({
      query: (number) => `/generation/${number}`,
    }),
    getPokemonData: builder.query({
      query: (name: string) => `/pokemon/${name}`,
    }),
  }),
});

export const {
  useGetPokemonDataQuery,
  useGetPokemonSpeciesByGenerationQuery,
  useGetPokemonSpeciesInGenerationQuery,
} = pokeApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import sort from "../functions/quicksort";
import axios from "../api/axios";

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
      query: (number) => ({ url: `/generation/${number}` }),
      transformResponse: async (response: any) => {
        const sortedData = sort(response.pokemon_species);
        const promisesArr = sortedData.map(async (e: any) => {
          const id = e?.url?.split("/")[6];
          const response = await axios.get(`/pokemon/${id}`);
          const data = await response.data;
          return data;
        });
        return Promise.all(promisesArr);
      },
    }),
    getPokemonData: builder.query({
      query: (name: string | undefined) => `/pokemon/${name}`,
    }),
  }),
});

export const {
  useGetPokemonDataQuery,
  useGetPokemonSpeciesByGenerationQuery,
  useGetPokemonSpeciesInGenerationQuery,
} = pokeApi;

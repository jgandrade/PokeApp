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
        let allData: any[] = [];
        for (let i = 0; i < sortedData.length; i++) {
          const id = sortedData[i]?.url?.match(/pokemon-species\/(\d+)/)[1];
          const response = await axios.get(`/pokemon/${id}`);
          const specieData = await response.data;
          allData.push(specieData);
        }
        return allData;
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

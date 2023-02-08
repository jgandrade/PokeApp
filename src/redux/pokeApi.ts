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
      query: (id: string | undefined) => `/pokemon/${id}`,
      transformResponse: async (response: any) => {
        const count = await axios.get(`/pokemon-species`);
        const newData: any = await axios.get(
          `/pokemon-species/${response?.id}`
        );
        const newData2 = await axios.get(
          `/evolution-chain/${
            newData?.data?.evolution_chain?.url?.split("/")[6]
          }`
        );
        return {
          ...response,
          ...newData.data,
          ...newData2.data,
          id: response?.id,
          numberOfSpecies: count.data.count,
        };
      },
    }),
  }),
});

export const {
  useGetPokemonDataQuery,
  useGetPokemonSpeciesByGenerationQuery,
  useGetPokemonSpeciesInGenerationQuery,
} = pokeApi;

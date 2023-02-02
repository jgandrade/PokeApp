import { createSlice } from "@reduxjs/toolkit";
import { IoMdPerson } from "react-icons/io";
import { IconType } from "react-icons/lib/esm/iconBase";

type initStateType = {
  name: string;
  image: string | IconType;
  favorites: {
    pokemonName: string;
    url: string;
  }[];
};

const initialState: initStateType = {
  name: "Guest",
  image: IoMdPerson,
  favorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.favorites = action.payload.favorites;
      state.image = action.payload.image;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;

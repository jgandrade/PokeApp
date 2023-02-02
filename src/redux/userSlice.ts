import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  name: string;
  image: string;
  favorites: {
    pokemonName: string;
    url: string;
  }[];
};

const initialState: initStateType = {
  name: "Guest",
  image: "",
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

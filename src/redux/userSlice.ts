import { createSlice } from "@reduxjs/toolkit";

type initStateType = {
  name: string | null;
  id: string | null;
  photo: string | null;
  favorites: {
    pokemonName: string;
    url: string;
  }[];
};

const initialState: initStateType = {
  name: null,
  photo: null,
  id: null,
  favorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.favorites = action.payload.favorites;
      state.id = action.payload.id;
      state.photo = action.payload.photo;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;

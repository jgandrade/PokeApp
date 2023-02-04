import { lazy } from "react";

export const Home = lazy(() => import("../pages/Home"));
export const Favorites = lazy(() => import("../pages/Favorites"));
export const Pokemon = lazy(() => import("../pages/Pokemon"));
export const Library = lazy(() => import("../pages/Library"));
export const PokemonCard = lazy(() => import("../components/PokemonCard"));

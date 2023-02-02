import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import {
  Home,
  Library,
  LibraryPage,
  Favorites,
  Pokemon,
} from "./imports/__import_to_app__";

function App() {
  return (
    <div className="App">
      <Nav />
      <Suspense fallback={<div>LOADING...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />}>
            <Route path=":page" element={<LibraryPage />} />
            <Route path=":name" element={<Pokemon />} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

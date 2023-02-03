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
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Nav />
      <Suspense fallback={<div>LOADING...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />}>
            <Route path=":page" element={<LibraryPage />} />
          </Route>
          <Route path="/pokemon/:name" element={<Pokemon />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

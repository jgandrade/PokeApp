import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import { Home, Library, Favorites, Pokemon } from "./imports/__import_to_app__";
import NotFound from "./pages/NotFound";
import Loader2 from "./components/Loader2";
import Loader from "./components/Loader";
import Paginate from "./components/Paginate";

function App() {
  return (
    <div className="App min-h-screen min-w-full">
      <Nav />
      <Suspense
        fallback={
          <div className="h-[calc(100vh-3rem)] flex justify-center items-center">
            <Loader />
          </div>
        }
      >
        <Paginate />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />}>
            <Route path="/library/:page" element={<Library />} />
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

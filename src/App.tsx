import { Suspense, useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import { Home, Library, Favorites, Pokemon } from "./imports/__import_to_app__";
import NotFound from "./pages/NotFound";
import LibraryPage from "./pages/LibraryPage";
import pokeball from "./assets/poke_ball.gif";
import Search from "./components/Search";
import { AppContext } from "./context/AppProvider";

function App() {
  const { loading } = useContext(AppContext);

  if (loading === true) {
    return (
      <div className="App min-h-screen min-w-full bg-[#111111]">
        <p className="text-white">LOADING</p>
      </div>
    );
  }

  return (
    <div className="App min-h-screen min-w-full bg-[#111111]">
      <Nav />
      <Search />
      <Suspense
        fallback={
          <div className="h-[calc(100vh-3rem)] flex justify-center items-center">
            <img src={pokeball} alt="loading" />
          </div>
        }
      >
        <div className="mt-[2rem]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<LibraryPage />}>
              <Route path=":page" element={<Library />} />
            </Route>
            <Route path="/pokemon/:name" element={<Pokemon />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;

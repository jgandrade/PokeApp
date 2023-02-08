import { Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import { Home, Library, Favorites, Pokemon } from "./imports/__import_to_app__";
import NotFound from "./pages/NotFound";
import LibraryPage from "./pages/LibraryPage";
import { Oval } from "react-loader-spinner";

function App() {
  return (
    <div className="App min-h-screen min-w-full bg-[#111111]">
      <Nav />
      <div className="mt-[7rem]">
        <Suspense
          fallback={
            <div className="h-[calc(100vh-3rem)] flex justify-center items-center">
              <Oval
                height={80}
                width={80}
                color="#F15B6C"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#f1a3ad"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<LibraryPage />}>
              <Route path=":page" element={<Library />} />
            </Route>
            <Route path="/pokemon/:name" element={<Pokemon />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;

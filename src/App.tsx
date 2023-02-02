import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { useSelector } from "react-redux";
import Library from "./pages/Library";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/pokemon/:name" element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;

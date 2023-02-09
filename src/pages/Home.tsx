import { Link } from "react-router-dom";
import pokeball from "../assets/poke_ball.gif";
function Home() {
  return (
    <div className="bg-[#111111] text-white py-16">
      <div className="container mx-auto px-6 flex justify-center">
        <div className="flex justify-between w-10/12 gap-5">
          <div className="w-1/2 text-left">
            <h1 className="text-5xl font-bold mb-6">Pokedex</h1>
            <p className="text-xl mb-8 w-10/12">
              Discover the world of Pokemon by looking at our library coming
              from PokeAPI
            </p>
            <a
              href="#"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              See More
            </a>
          </div>
          <div className="w-1/2 text-right flex flex-col items-end">
            <h1 className="text-5xl font-bold mb-6">Join the Game</h1>
            <p className="text-xl mb-8 w-11/12 ">
              Embark on a journey to catch them all and become a Pokemaster. By
              playing a trading card game which involves game of chances. Be the
              first to get that Legendary card on the palm of your hands ermm..
              Account I mean
            </p>
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

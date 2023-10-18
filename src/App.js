import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useReactFontLoader from "react-font-loader";

function App() {
  useReactFontLoader({
    url: "https://fonts.googleapis.com/css2?family=Erica+One&family=Shrikhand&display=swap",
  });

  const [pokemonList, setPokemonList] = useState([golduck, bulbasaur, lileep]);
  const [matchList, setMatchList] = useState([]);

  const context = {
    pokemonList: pokemonList,
    setPokemonList: setPokemonList,
    matchList: matchList,
    setMatchList: setMatchList,
  };

  return (
    <div className="container py-4">
      <NavBar />
      <Outlet context={context} />
    </div>
  );
}

function NavBar() {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/swipe">
          Swipe
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/matches">
          Matches
        </NavLink>
      </li>
    </ul>
  );
}

//Temp
const golduck = {
  name: "Golduck",
  img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png",
  desc: "Water Type",
  level: 32,
  uuid: "golduck",
};

const bulbasaur = {
  name: "Bulbasaur",
  img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  desc: "Grass Type",
  level: 5,
  uuid: "bulbasaur",
};

const lileep = {
  name: "Lileep",
  img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/345.png",
  desc: "Rock/Grass Type",
  level: 25,
  uuid: "lileep",
};

export default App;

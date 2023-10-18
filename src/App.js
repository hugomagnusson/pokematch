import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Pokemon, PokemonHandler } from "./PokemonHandler";

function App() {
  var pokeH = PokemonHandler.create()
  Promise.all(pokeH.pokeList)
  console.log(pokeH.pokeList[1]['name'])
  const [pokemonList, setPokemonList] = useState([golduck, bulbasaur, lileep]);
  const context = {
    pokemonList: pokemonList,
    setPokemonList: setPokemonList,
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
        <NavLink className="nav-link" to="/match">
          Match
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
  uuid: "golduck"
};

const bulbasaur = {
  name: "Bulbasaur",
  img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
  desc: "Grass Type",
  level: 5,
  uuid: "bulbasaur"
};

const lileep = {
  name: "Lileep",
  img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/345.png",
  desc: "Rock/Grass Type",
  level: 25,
  uuid: "lileep"
};

export default App;

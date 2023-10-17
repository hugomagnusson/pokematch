import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  const golduck1 = {
    name: "Golduck",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png?fbclid=IwAR3oFTCKZz4TnSNrCrIbgntr5DzPvwNVWrkWbHiljDjAZ_so7GglgzQHo0A",
    desc: "Water Type",
    level: 32,
    id: "golduck-1"
  };

  const golduck2 = {
    name: "Golduck",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png?fbclid=IwAR3oFTCKZz4TnSNrCrIbgntr5DzPvwNVWrkWbHiljDjAZ_so7GglgzQHo0A",
    desc: "Water Type",
    level: 12,
    id: "golduck-2"
  };

  const [pokemonList, setPokemonList] = useState([golduck1, golduck2]);
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

export default App;

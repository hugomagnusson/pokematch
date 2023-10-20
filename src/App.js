import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, createContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useReactFontLoader from "react-font-loader";
import { fetchPokemons } from "./apiHandler";
import { randomIntList } from "./utils";
import { SettingsProvider } from "./SettingsProvider.js";

function App() {
  useReactFontLoader({
    url: "https://fonts.googleapis.com/css2?family=Erica+One&family=Shrikhand&display=swap",
  });

  const [pokemonList, setPokemonList] = useState([]);
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    if (pokemonList.length < 2) {
      fetchPokemons(randomIntList(1, 1, 500)).then((list) => {
        setPokemonList(list.concat(pokemonList));
      });
    }
  }, [pokemonList]);

  const context = {
    pokemonList: pokemonList,
    setPokemonList: setPokemonList,
    matchList: matchList,
    setMatchList: setMatchList,
  };

  return (
    <div className="container py-4">
      <NavBar />
      <SettingsProvider>
        <Outlet context={context} />
      </SettingsProvider>
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
      <li className="nav-item">
        <NavLink className="nav-link" to="/settings">
          Settings
        </NavLink>
      </li>
    </ul>
  );
}

export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useReactFontLoader from "react-font-loader";
import { fetchPokemons } from "./apiHandler";
import { randomIntList } from "./utils";

function App() {
  useReactFontLoader({
    url: "https://fonts.googleapis.com/css2?family=Erica+One&family=Shrikhand&display=swap",
  });

  const [pokemonList, setPokemonList] = useState([]);
  const [matchList, setMatchList] = useState([]);

  useEffect(() => {
    console.log("Effect");
    if (pokemonList.length < 2) {
      fetchPokemons(randomIntList(1, 1, 500)).then((list) => {
        setPokemonList(list.concat(pokemonList));
      });
    }
    console.log(pokemonList);
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

function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default App;

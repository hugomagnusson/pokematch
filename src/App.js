import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, createContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useReactFontLoader from "react-font-loader";
import { Pokemon } from "./pokemon";
import { fetchPokemons } from "./apiHandler";
import { randomIntList } from "./utils";
import useSettingsContext from "./useSettingsContext.js";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

function App() {
  useReactFontLoader({
    url: "https://fonts.googleapis.com/css2?family=Erica+One&family=Shrikhand&display=swap",
  });

  const [pokemonList, setPokemonList] = useState([]);
  const [matchList, setMatchList] = useState([]);
  const { state, actions } = useSettingsContext();

  useEffect(() => {
    if (pokemonList.length < 2) {
      console.log(
        state.minGen,
        state.maxGen,
        Pokemon.getNumberByGeneration(state.minGen - 1),
        Pokemon.getNumberByGeneration(state.maxGen)
      );
      const list = randomIntList(1,Pokemon.getNumberByGeneration(state.minGen - 1),Pokemon.getNumberByGeneration(state.maxGen));
      console.log(list);
      fetchPokemons(list, state.oldSprites).then((list) => {
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
    <Container className="py-4">
      <NavBar />
      <Outlet context={context} />
    </Container>
  );
}

function NavBar() {
  return (
    <Nav variant="tabs">
      <Nav.Item>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/swipe">
          Swipe
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/matches">
          Matches
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className="nav-link" to="/settings">
          Settings
        </NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default App;

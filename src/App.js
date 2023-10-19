import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useReactFontLoader from "react-font-loader";
import { fetchPokemons } from "./apiHandler";
import { randomIntList } from "./utils";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

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
    </Nav>
  );
}

export default App;

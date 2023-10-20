import React, { useState, useMemo, useRef } from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import TinderCard from "react-tinder-card";
import { FaTimes, FaHeart } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Swipe() {
  const context = useOutletContext();
  const pokemonList = context.pokemonList;

  const [currentIndex, setCurrentIndex] = useState(1);
  const currentIndexRef = useRef(currentIndex);
  const [isMatch, setMatch] = useState(false);
  const canSwipe = currentIndex >= 0 && !isMatch;

  const childRefs = useMemo(
    () =>
      Array(pokemonList.length)
        .fill(0)
        .map(() => React.createRef()),
    [pokemonList]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const outOfFrame = (dir, pokemon, idx) => {
    console.log(
      `${pokemon.name} (${idx}) was swiped to the ${dir}`,
      currentIndexRef.current
    );

    if (dir === "right" && pokemon.isMatch()) {
      console.log(`It's a match: ${pokemon.name}`);
      const newList = context.matchList.slice();
      newList.push(pokemon);
      context.setMatchList(newList);
      setMatch(true);
    }

    removePokemon(pokemon);
    updateCurrentIndex(1);
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < pokemonList.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const removePokemon = (pokemon) => {
    const newList = pokemonList.slice();
    newList.splice(pokemonList.indexOf(pokemon));
    context.setPokemonList(newList);
  };

  return (
    <>
      <h1 className="text-center font-erica-one mt-2">PokeMatch</h1>
      <div className="d-flex justify-content-center">
        {pokemonList.map((pokemon, index) => (
          <TinderCard
            className="position-absolute"
            ref={childRefs[index]}
            key={pokemon.uuid}
            onSwipe={() => updateCurrentIndex(-1)}
            onCardLeftScreen={(dir) => outOfFrame(dir, pokemon, index)}
          >
            <PokemonCard pokemon={pokemon} />
          </TinderCard>
        ))}
      </div>
      {isMatch ? <MatchPopup setMatch={setMatch} /> : <></>}
      <div className="fixed-bottom text-center">
        <ButtonMenu swipe={swipe} className="p-2"/>
      </div>
    </>
  );
}

function PokemonCard({ pokemon }) {
  const cardStyle = {
    backgroundImage: "url('/img/background.png')",
    width: 18 + "rem",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const cardBodyStyle = {
    backgroundImage: `url(${pokemon.img})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    paddingTop: 285 + "px",
  };

  return (
    <Card className="position-relative shadow" style={cardStyle}>
      <Card.Body style={cardBodyStyle}>
        <NavLink className="nav-link" to={`/profile/${pokemon.uuid}`}>
          <h3 className="border-top border-dark m-0">
            <b>{pokemon.name}</b>
          </h3>
        </NavLink>
        <p className="col-3 m-0 p-0">lvl {pokemon.level}</p>
        <p className="card-text">{pokemon.getTypeString()}</p>
      </Card.Body>
    </Card>
  );
}

function ButtonMenu({ swipe }) {
  return (
    <>
      <Button
        variant="outline-danger"
        className="m-2"
        onClick={() => swipe("left")}
      >
        <FaTimes />
      </Button>
      <Button
        variant="outline-success"
        className="m-2"
        onClick={() => swipe("right")}
      >
        <FaHeart />
      </Button>
    </>
  );
}

function MatchPopup({ setMatch }) {
  const style = {
    backgroundImage: "url('/img/pokeball.gif')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="d-flex justify-content-center mt-5 pt-3">
      <div className="position-absolute text-end" style={style}>
        <Button variant="outline-dark" onClick={() => setMatch(false)}>
          <FaTimes />
        </Button>
        <h1 className="font-shrikhand text-center mb-5 pt-2 pb-3">Gotcha!</h1>
        <h3 className="font-erica-one text-center mt-5 pt-1 px-4">
          It's a Match
        </h3>
      </div>
    </div>
  );
}

export default Swipe;

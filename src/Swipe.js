import React, { useState, useMemo, useRef } from "react";
import { useOutletContext, NavLink, useLoaderData } from "react-router-dom";
import TinderCard from "react-tinder-card";
import { FaTimes, FaHeart } from "react-icons/fa";

function Swipe() {
  const context = useOutletContext();
  const [pokemonList, setPokemonList] = useState(useLoaderData());
  const [currentIndex, setCurrentIndex] = useState(pokemonList.length - 1);
  const currentIndexRef = useRef(currentIndex);
  const canSwipe = currentIndex >= 0;

  const [isMatch, setMatch] = useState(false);

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

  const swiped = (dir, pokemon, index) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (dir, pokemon, idx) => {
    console.log(
      `${pokemon.name} (${idx}) was swiped to the ${dir}`,
      currentIndexRef.current
    );

    //TODO: change true to matchin algorithm
    if (dir === "right" && true) {
      console.log(`It's a match: ${pokemon.name}`);
      const newList = context.matchList.slice();
      newList.push(pokemon);
      context.setMatchList(newList);
      setMatch(true);
    }

    removePokemon(pokemon);
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < pokemonList.length) {
      await childRefs[currentIndex].current.swipe(dir);
    }
  };

  const removePokemon = (pokemon) => {
    const newList = pokemonList.slice();
    newList.splice(pokemonList.indexOf(pokemon));
    setPokemonList(newList);
  };

  return (
    <div>
      <h1 className="text-center font-erica-one">PokeMatch</h1>
      <div className="d-flex justify-content-center">
        {pokemonList.map((pokemon, index) => (
          <TinderCard
            className="position-absolute"
            ref={childRefs[index]}
            key={pokemon.uuid}
            onSwipe={(dir) => swiped(dir, pokemon, index)}
            onCardLeftScreen={(dir) => outOfFrame(dir, pokemon, index)}
            flickOnSwipe="false"
          >
            <Card pokemon={pokemon} />
          </TinderCard>
        ))}
      </div>
      {isMatch ? <MatchPopup setMatch={setMatch} /> : <></>}
      <div className="fixed-bottom text-center">
        <ButtonMenu swipe={swipe} pokemonList={pokemonList} />
      </div>
    </div>
  );
}

function Card({ pokemon }) {
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
    <div className="card position-relative shadow" style={cardStyle}>
      <div className="card-body" style={cardBodyStyle}>
        <NavLink className="nav-link" to={`/profile/${pokemon.uuid}`}>
          <h3 className="border-top border-dark m-0">
            <b>{pokemon.name}</b>
          </h3>
        </NavLink>
        <p className="col-3 m-0 p-0">lvl {pokemon.level}</p>
        <p className="card-text">{pokemon.desc}</p>
      </div>
    </div>
  );
}

function ButtonMenu({ swipe, pokemonList }) {
  return (
    <div className="p-2">
      <button
        type="button"
        className="btn btn-outline-danger m-2"
        onClick={() => swipe("left")}
      >
        <FaTimes />
      </button>
      <button
        type="button"
        className="btn btn-outline-success m-2"
        onClick={() => swipe("right")}
      >
        <FaHeart />
      </button>
      {pokemonList.length}
    </div>
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
        <button
          type="button"
          className="btn btn-outline-dark btn-no-outline"
          onClick={() => setMatch(false)}
          style={{ outline: "none" }}
        >
          <FaTimes />
        </button>
        <h1 className="font-shrikhand text-center mb-5 pt-2 pb-3">Gotcha!</h1>
        <h3 className="font-erica-one text-center mt-5 pt-1 px-4">
          It's a Match
        </h3>
      </div>
    </div>
  );
}

export default Swipe;

import React, { useState, useMemo, useRef } from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import TinderCard from "react-tinder-card";
import { FaTimes, FaHeart, FaUndo } from "react-icons/fa";

function Match() {
  const pokemonList = useOutletContext().pokemonList;

  const [currentIndex, setCurrentIndex] = useState(pokemonList.length - 1);
  const [lastDirection, setLastDirection] = useState();

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(pokemonList.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < pokemonList.length - 1;
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < pokemonList.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div>
      <h1 className="text-center">PokeMatch!</h1>
      <div className="d-flex justify-content-center">
        {pokemonList.map((pokemon, index) => (
          <TinderCard
            className="position-absolute"
            ref={childRefs[index]}
            key={pokemon.uuid}
            onSwipe={(dir) => swiped(dir, pokemon.name, index)}
            onCardLeftScreen={() => outOfFrame(pokemon.name, index)}
            flickOnSwipe="false"
          >
            <Card pokemon={pokemon} />
          </TinderCard>
        ))}
      </div>
      <div className="fixed-bottom text-center">
        <ActionButtons swipe={swipe} goBack={goBack} />
      </div>
    </div>
  );
}

function Card({ pokemon }) {
  const cardStyle = {
    backgroundImage: "url('/background.png')",
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

function ActionButtons({ swipe, goBack }) {
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
        className="btn btn-outline-warning m-2"
        onClick={() => goBack()}
      >
        <FaUndo />
      </button>
      <button
        type="button"
        className="btn btn-outline-success m-2"
        onClick={() => swipe("right")}
      >
        <FaHeart />
      </button>
    </div>
  );
}

export default Match;

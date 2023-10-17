import React, { useState, useMemo, useRef } from "react";
import { useOutletContext } from "react-router-dom";
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
            key={pokemon.id}
            onSwipe={(dir) => swiped(dir, pokemon.name, index)}
            onCardLeftScreen={() => outOfFrame(pokemon.name, index)}
            flickOnSwipe="false"
          >
            <div
              className="card position-relative"
              style={{ width: 18 + "rem" }}
            >
              <img className="card-img-top" src={pokemon.img} alt="" />
              <div className="card-body">
                <h5 className="card-title">
                  {pokemon.name} (lvl {pokemon.level})
                </h5>
                <p className="card-text">{pokemon.desc}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="fixed-bottom text-center">
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
        {lastDirection ? (
          <p key={lastDirection}>You swiped {lastDirection}</p>
        ) : (
          <p>
            Swipe a card or press a button to get Restore Card button visible!
          </p>
        )}
      </div>
    </div>
  );
}

export default Match;

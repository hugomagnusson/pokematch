import { useState } from 'react';
import { SettingsContext } from './SettingsContext.js';

export function SettingsProvider({ children }) {
  const storedGens = JSON.parse(localStorage.getItem("gens"));
  const storedOldSprites = JSON.parse(localStorage.getItem("oldSprites"));

  console.log("stored gens " + JSON.stringify(storedGens));

  const [gens, setGens] = useState(storedGens ? {minGen: storedGens.minGen, maxGen: storedGens.maxGen} : {minGen: 1, maxGen: 8});
  const [oldSprites, setOldSprites] = useState(storedOldSprites ? storedOldSprites : false);

  const setGensSave = (val) => {
    console.log("set gens save");

    console.log("normal" + val.maxGen);

    console.log("stringified" + JSON.stringify(val));

    setGens(val);
    localStorage.setItem("gens", JSON.stringify(val));
  };

  const setOldSpritesSave = (val) => {
    console.log("set sprites save");
    setOldSprites(val);
    localStorage.setItem("oldSprites", JSON.stringify(val));
  };

  const value = {
    state: { ...gens, oldSprites },
    actions: { setGensSave, setOldSpritesSave},
  };

  console.log("value is: " + value.state.minGen);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
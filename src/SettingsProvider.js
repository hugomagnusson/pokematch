import { useState } from "react";
import { SettingsContext } from "./SettingsContext.js";

export function SettingsProvider({ children }) {
  const storedGens = JSON.parse(localStorage.getItem("gens"));
  const storedOldSprites = JSON.parse(localStorage.getItem("oldSprites"));


  const [gens, setGens] = useState(
    storedGens ?
    (!storedGens.minGen && !storedGens.maxGen)
      ? { minGen: storedGens.minGen, maxGen: storedGens.maxGen }
      : { minGen: 1, maxGen: 8 }
      : { minGen: 1, maxGen: 8 }
  );
  const [oldSprites, setOldSprites] = useState(
    storedOldSprites ? storedOldSprites : false
  );

  const setGensSave = (val) => {



    setGens(val);
    localStorage.setItem("gens", JSON.stringify(val));
  };

  const setOldSpritesSave = (val) => {
    setOldSprites(val);
    localStorage.setItem("oldSprites", JSON.stringify(val));
  };

  const value = {
    state: { ...gens, oldSprites },
    actions: { setGensSave, setOldSpritesSave },
  };


  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

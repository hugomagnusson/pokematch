import { useContext } from "react";
import { SettingsContext } from "./SettingsContext";

// kom åt inställningarna genom ## const {state, actions} = useSettingsContext() ## och ex. ## state.minGens ##
export default function useSettingsContext() {
  return useContext(SettingsContext);
}

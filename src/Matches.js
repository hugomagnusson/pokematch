import { useOutletContext } from "react-router-dom";

function Matches() {
  const matchList = useOutletContext().matchList;

  return (
    <div>
      {matchList.map((pokemon) => (
        <div>
          {pokemon.name}
          <br />
        </div>
      ))}
    </div>
  );
}

export default Matches;

import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Matches() {
  const matchList = useOutletContext().matchList;

  return (
    <div>
      <h1 className="text-center font-erica-one mt-2">Matches</h1>
      <div className="list-group mt-1">
        {matchList.map((pokemon) => (
          <li className="list-group-item">
            <NavLink className="nav-link" to={`/profile/${pokemon.uuid}`}>
              <div className="row align-items-center">
                <div className="col-1">
                  <img
                    className="img-thumbnail-custom"
                    src={pokemon.img}
                    alt=""
                  ></img>
                </div>
                <div className="col-2">
                  {`${pokemon.name} (lvl ${pokemon.level})`}
                </div>
              </div>
            </NavLink>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Matches;

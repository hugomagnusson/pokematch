import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { sortList } from "./utils";

function Matches() {
  const context = useOutletContext();
  const [sort, setSort] = useState("");

  return (
    <div>
      <h1 className="text-center font-erica-one mt-2">Matches</h1>
      <SortForm context={context} sort={sort} setSort={setSort} />
      <div className="list-group mt-1">
        {context.matchList.map((pokemon) => (
          <ListItem pokemon={pokemon} key={pokemon.uuid} />
        ))}
      </div>
    </div>
  );
}

function ListItem({ pokemon }) {
  return (
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
  );
}

function SortForm({ context, sort, setSort }) {
  const options = ["Name", "Level"];

  const sortItems = (event) => {
    if (context.matchList.length === 0) {
      return;
    }

    const value = event.target.value;
    setSort(value);
    context.setMatchList(sortList(context.matchList, value.toLowerCase()));
  };

  return (
    <div className="form-group pb-3 col-3">
      <select value={sort} className="form-select" onChange={sortItems}>
        <option disabled={true} value="">
          Sort Your Matches
        </option>
        {options.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Matches;

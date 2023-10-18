import { useOutletContext, useParams } from "react-router-dom";

function Profile() {
  const uuid = useParams().uuid;
  const pokemonList = useOutletContext().pokemonList;
  const pokemon = pokemonList.find((pokemon) => pokemon.uuid === uuid);

  return (
    <div className="card mx-auto mt-5 shadow" style={{width: 18 + "rem"}}>
      <img className="card-img-top" src={pokemon.img} alt=""></img>
      <h5 className="card-title">{pokemon.name}</h5>
      <p className="card-text">
        Description...
      </p>
    </div>
  );
}

export default Profile;

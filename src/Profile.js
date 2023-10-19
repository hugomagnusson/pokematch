import { useOutletContext, useParams } from "react-router-dom";

function Profile() {
  const uuid = useParams().uuid;
  const context = useOutletContext();
  const allPokemon = context.pokemonList.concat(context.matchList);
  const pokemon = allPokemon.find((pokemon) => pokemon.uuid === uuid);

  return (
    <div className="card mx-auto mt-5 shadow p-2" style={{ width: 18 + "rem" }}>
      <img className="card-img-top border-bottom border-dark" src={pokemon.img} alt=""></img>
      <div className="row card-title align-items-center mt-3">
        <div className="col">
          <h4><strong>{pokemon.name}</strong></h4>
        </div>
        <div className="col-3">
        {`lvl ${pokemon.level}`}
        </div>
      </div>
      <div className="card-text border-top border-dark">
        <p>{pokemon.flavorText}</p>
        <p>Type: {pokemon.getTypeString()}</p>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
        <p>Catch Rate: {pokemon.getCaptureRateString()}</p>
      </div>
    </div>
  );
}

export default Profile;

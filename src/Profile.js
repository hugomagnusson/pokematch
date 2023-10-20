import { useOutletContext, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Profile() {
  const uuid = useParams().uuid;
  const context = useOutletContext();
  const allPokemon = context.pokemonList.concat(context.matchList);
  const pokemon = allPokemon.find((pokemon) => pokemon.uuid === uuid);

  if (!pokemon){
    return;
  }

  return (
    <Card className="mx-auto mt-5 shadow" style={{ width: 18 + "rem" }}>
      <Card.Img variant="top" src={pokemon.img}></Card.Img>
      <Card.Body className="">
        <Card.Title className="border-top border-dark">
          <Row className="mt-3">
            <Col>
              <h4>
                <strong>{pokemon.name}</strong>
              </h4>
            </Col>
            <Col className="text-end">{`lvl ${pokemon.level}`}</Col>
          </Row>
        </Card.Title>
        <Card.Text className="border-top border-dark pb-2">
          <p>{pokemon.flavorText}</p>
          <p>Type: {pokemon.getTypeString()}</p>
          <p>Height: {pokemon.getHeightString()}</p>
          <p>Weight: {pokemon.getWeightString()}</p>
          <p>Catch Rate: {pokemon.getCaptureRateString()}</p>
          <p>Match Chance: {pokemon.getMatchChanceString()}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Profile;

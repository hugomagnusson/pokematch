import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { sortList } from "./utils";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Matches() {
  const context = useOutletContext();
  const [sort, setSort] = useState("");

  return (
    <>
      <h1 className="text-center font-erica-one mt-2">Matches</h1>
      {context.matchList.length !== 0 && (
        <SortForm
          context={context}
          sort={sort}
          setSort={setSort}
          className="mb-5"
        />
      )}
      <ListGroup className="mt-1">
        {context.matchList.map((pokemon) => (
          <ListItem pokemon={pokemon} key={pokemon.uuid} />
        ))}
      </ListGroup>
    </>
  );
}

function ListItem({ pokemon }) {
  return (
    <ListGroup.Item>
      <NavLink className="nav-link" to={`/profile/${pokemon.uuid}`}>
        <Row xs="auto" className="align-items-center">
          <Col>
            <Image
              src={pokemon.img}
              style={{ width: 80 + "px" }}
              roundedCircle
              thumbnail
            ></Image>
          </Col>
          <Col>
            <h4>{`${pokemon.name} (lvl ${pokemon.level})`}</h4>
          </Col>
        </Row>
      </NavLink>
    </ListGroup.Item>
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
    <Form.Select value={sort} onChange={sortItems}>
      <option disabled={true} value="">
        Sort Your Matches
      </option>
      {options.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </Form.Select>
  );
}

export default Matches;

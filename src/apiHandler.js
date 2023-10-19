import { v4 as uuidv4 } from "uuid";
import { randomInt, capitalize } from "./utils";

async function fetchPokemons(ids) {
  const list = [];

  return Promise.all(
    ids.map(async (id) => {
      const pokemon = await safeFetchJson(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      list.push(new Pokemon(pokemon));
    })
  ).then(() => list);
}

async function safeFetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} returned status ${response.status}`);
  }

  return await response.json();
}

class Pokemon {
  constructor(data) {
    this.img = data["sprites"]["other"]["official-artwork"]["front_default"];
    this.name = capitalize(data["name"]);
    this.number = data["id"];
    this.heigt = data["height"];
    this.weight = data["weight"];
    this.level = randomInt(1, 100);
    this.desc = "Empty";
    this.types = Type.parseTypes(data["types"]);
    this.uuid = uuidv4();
  }

  isMatch() {
    return true;
  }

  getTypeString() {
    return this.types
      .map((type) => capitalize(type.name))
      .reduce((a, b) => a + "/" + b);
  }
}

class Type {
  constructor(data) {
    this.name = data["name"];
  }

  static parseTypes(types) {
    return types.map((type) => {
      return new Type(type["type"]);
    });
  }
}

export { Pokemon, fetchPokemons };

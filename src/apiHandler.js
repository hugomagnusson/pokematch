import { v4 as uuidv4 } from "uuid";
import { randomInt, capitalize } from "./utils";

async function fetchPokemons(ids) {
  const list = [];

  return Promise.all(
    ids.map(async (id) => {
      const pokemon = safeFetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const species = safeFetchJson(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      list.push(new Pokemon(await pokemon, await species));
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
  constructor(pokemon, species) {
    this.img = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    this.name = capitalize(pokemon["name"]);
    this.number = pokemon["id"];
    this.height = pokemon["height"];
    this.weight = pokemon["weight"];
    this.level = this.generateRandomLevel();
    this.types = Type.parseTypes(pokemon["types"]);
    this.captureRate = species["capture_rate"];
    this.flavorText =
      species["flavor_text_entries"][
        randomInt(0, species["flavor_text_entries"].length - 1)
      ]["flavor_text"];
    this.uuid = uuidv4();
  }

  generateRandomLevel() {
    return Math.max(
      1,
      Math.round(
        Math.cbrt(
          10 *
            (randomInt(1, 10) *
              randomInt(1, 10) *
              randomInt(1, 10) *
              randomInt(1, 10) *
              randomInt(1, 10))
        )
      )
    );
  }

  isMatch() {
    return randomInt(0, 255) - this.captureRate > 0;
  }

  getCaptureRateString() {
    return Math.round((this.captureRate / 255) * 100) + "%";
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

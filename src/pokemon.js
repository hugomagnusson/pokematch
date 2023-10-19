import { v4 as uuidv4 } from "uuid";
import { randomInt, capitalize } from "./utils";

class Pokemon {
  constructor(pokemon, species) {
    this.img = pokemon["sprites"]["other"]["official-artwork"]["front_default"];
    this.name = capitalize(pokemon["name"]);
    this.number = pokemon["id"];
    this.height = pokemon["height"];
    this.weight = pokemon["weight"];
    this.level = this.generateRandomLevel();
    this.types = Type.parseTypes(pokemon["types"]);

    //Number between 1 and 255, where 255 is 100 % capture rate
    this.captureRate = species["capture_rate"];

    // Description
    this.flavorText =
      species["flavor_text_entries"][
        randomInt(0, species["flavor_text_entries"].length - 1)
      ]["flavor_text"];
    this.uuid = uuidv4();
  }

  // Generates a random level where low levels are more common
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
    return this.getMatchChance() - randomInt(0, 255) > 0;
  }

  getMatchChance() {
    return this.captureRate + this.getLevelBonus();
  }

  getLevelBonus() {
    return (100 - this.level) * 0.3;
  }

  getHeightString() {
    const height =
      this.height.toString().length === 1
        ? "0" + this.height.toString()
        : this.height.toString();
    return (
      height.slice(0, height.length - 1) +
      "." +
      height.charAt(height.length - 1) +
      " m"
    );
  }

  getWeightString() {
    const weight =
      this.weight.toString().length === 1
        ? "0" + this.weight.toString()
        : this.weight.toString();
    return (
      weight.slice(0, weight.length - 1) +
      "." +
      weight.charAt(weight.length - 1) +
      " kg"
    );
  }

  getCaptureRateString() {
    return Math.round((this.captureRate / 255) * 100) + " %";
  }

  getMatchChanceString() {
    return Math.round((this.getMatchChance() / 255) * 100) + " %";
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

export { Pokemon };

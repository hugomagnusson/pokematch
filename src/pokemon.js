import { v4 as uuidv4 } from "uuid";
import { randomInt, capitalize } from "./utils";

class Pokemon {
  constructor(pokemon, species, oldSprites) {
    console.log(pokemon["sprites"]["versions"]["generation-i"]["red-blue"]);
    this.img = !oldSprites
      ? pokemon["sprites"]["other"]["official-artwork"]["front_default"]
      : pokemon["sprites"]["versions"]["generation-i"]["red-blue"][
          "front_default"
        ];
    //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/red-blue/35.png
    this.name = capitalize(pokemon["name"]);
    this.number = pokemon["id"];
    this.height = pokemon["height"];
    this.weight = pokemon["weight"];
    this.level = this.generateRandomLevel();
    this.types = Type.parseTypes(pokemon["types"]);
    this.generation = species.generation.url.charAt(37);

    //Number between 1 and 255, where 255 is 100 % capture rate
    this.captureRate = species["capture_rate"];

    // Description
    let possibleFlavor = species["flavor_text_entries"].filter(
      (p) => p["language"]["name"] === "en"
    );
    this.flavorText =
      possibleFlavor[randomInt(0, possibleFlavor.length - 1)]["flavor_text"];
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
    const chance = randomInt(0, 255);
    //console.log(chance, this.getMatchChance())
    return this.getMatchChance() - chance > 0;
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

  static getNumberByGeneration(generation) {
    if (generation.toString() === '1') {
      return 151;
    }
    if (generation.toString() === '2') {
      return 251;
    }
    if (generation.toString() === '3') {
      return 386;
    }
    if (generation.toString() === '4') {
      return 493;
    }
    if (generation.toString() === '5') {
      return 649;
    }
    if (generation.toString() === '6') {
      return 721;
    }
    if (generation.toString() === '7') {
      return 809;
    }
    if (generation.toString() === '8') {
      return 905;
    }
    if (generation.toString() === '9') {
      return 1013;
    }

    return 1;
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

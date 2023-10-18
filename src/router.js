import { createBrowserRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import App from "./App";
import ErrorPage from "./error";
import Index from "./index.js";
import Swipe from "./Swipe";
import Profile from "./Profile";
import Matches from "./Matches";
import { randomInt, capitalize, randomIntList } from "./utils";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/swipe",
        element: <Swipe />,
        loader: pokemonLoader,
      },
      {
        path: "/profile/:uuid",
        element: <Profile />,
      },
      {
        path: "/matches",
        element: <Matches />,
      },
    ],
  },
]);

async function pokemonLoader() {
  return await fetchPokemons([], randomIntList(10, 1, 390));
}

async function fetchPokemons(list, ids) {
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
    this.level = randomInt(1, 100);
    this.desc = "Empty";
    this.types = Type.parseTypes(data["types"]);
    this.uuid = uuidv4();
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

export default router;
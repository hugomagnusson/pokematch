import { Pokemon } from "./pokemon";

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

export { fetchPokemons };

import { Pokemon } from "./pokemon";

async function fetchPokemons(ids, minGen, maxGen, oldSprites) {
  const list = [];

  return Promise.all(
    ids.map(async (id) => {
      const pokemon = safeFetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const species = safeFetchJson(
        `https://pokeapi.co/api/v2/pokemon-species/${id}` //37 tecken innan 4
      );
      await Promise.all([pokemon, species]);
      const gen = (await species).generation.url.charAt(37);
      if (gen >= minGen && gen <= maxGen) {
        list.push(new Pokemon(await pokemon, await species, oldSprites));
      }
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

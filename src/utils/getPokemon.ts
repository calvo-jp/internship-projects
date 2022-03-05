import normalizePokemonObject from "./normalizePokemonObject";

const getPokemon = async (query: { id: String | number } | { url: string }) => {
  const request =
    "id" in query
      ? new Request("https://pokeapi.co/api/v2/pokemon/" + query.id)
      : new Request(query.url);

  try {
    const response = await fetch(request);
    const pokemon = await response.json();

    return normalizePokemonObject(pokemon);
  } catch (e) {
    return null;
  }
};

export default getPokemon;

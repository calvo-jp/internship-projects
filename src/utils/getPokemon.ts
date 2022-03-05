import normalizePokemonObject from "./normalizePokemonObject";

const getPokemon = async (id: String | number) => {
  if (!id) return null;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();

    return normalizePokemonObject(pokemon);
  } catch (e) {
    return null;
  }
};

export default getPokemon;

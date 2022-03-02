import normalizePokemonObject from "./normalizePokemonObject";

const getPokemon = async (id: any) => {
  if (!id) return null;

  try {
    const response = await fetch(`${process.env.API_BASE_URL}${id}`);
    const pokemon = await response.json();

    return normalizePokemonObject(pokemon);
  } catch (e) {
    return null;
  }
};

export default getPokemon;

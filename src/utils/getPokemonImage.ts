import { CorePokemonData } from "types/CorePokemonData";

const getPokemonImage = (pokemon: CorePokemonData) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
};

export default getPokemonImage;

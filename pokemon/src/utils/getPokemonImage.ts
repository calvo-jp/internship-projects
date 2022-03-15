import { CorePokemonData } from "types/CorePokemonData";

const getPokemonImage = (pokemon: CorePokemonData) => {
  const sprites = pokemon.sprites.at(0);

  if (!!sprites) {
    try {
      const obj = JSON.parse(sprites.sprites);

      const img =
        obj.other.dream_world.front_default ||
        obj.other.home.front_default ||
        obj.front_default;

      if (img) return img;
    } catch {}
  }

  return getCdn(pokemon.id);
};

const getCdn = (id: number | string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
};

export default getPokemonImage;

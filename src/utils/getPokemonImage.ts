import { GetPokemon } from "types/GetPokemon";
import { GetPokemons } from "types/GetPokemons";

type PokemonType =
  | GetPokemons["pokemon_v2_pokemon"][number]
  | NonNullable<GetPokemon["pokemon_v2_pokemon_by_pk"]>;

const getPokemonImage = (pokemon: PokemonType) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
};

export default getPokemonImage;

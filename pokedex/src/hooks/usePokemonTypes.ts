import { useQuery } from "@apollo/client";
import { GET_POKEMON_TYPES } from "graphql/pokeapi/queries";
import { GetPokemonTypes } from "__generated__/GetPokemonTypes";

const usePokemonTypes = () => {
  const { loading, data } = useQuery<GetPokemonTypes>(GET_POKEMON_TYPES);
  return !loading && data
    ? data.pokemon_v2_type
        .map(({ name }) => name)
        .filter((value) => value !== "unknown")
    : [];
};

export default usePokemonTypes;

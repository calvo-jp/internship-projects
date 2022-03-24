import { useQuery } from "@apollo/client";
import { GET_POKEMON_TYPES } from "graphql/pokeapi/queries";
import { GetPokemonTypes } from "__generated__/GetPokemonTypes";

const usePokemonTypes = () => {
  const { loading, data, error } = useQuery<GetPokemonTypes>(GET_POKEMON_TYPES);

  return {
    loading,
    error,
    data: data?.pokemon_v2_type
      .map(({ name }) => name)
      .filter((value) => value !== "unknown"),
  };
};

export default usePokemonTypes;

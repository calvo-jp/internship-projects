import { Box, SimpleGrid } from "@chakra-ui/react";
import { GetPokemons } from "types/GetPokemons";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: GetPokemons["pokemon_v2_pokemon"];
  isSSG?: boolean;
}

const PokemonList = ({ pokemons, isSSG }: PokemonListProps) => {
  return (
    <SimpleGrid spacing={{ base: 2, md: 4 }} columns={{ base: 1, md: 2 }}>
      {pokemons.map((pokemon) => (
        <Box key={pokemon.id}>
          <PokemonCard data={pokemon} isSSG={isSSG} />
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default PokemonList;

import { Box, SimpleGrid } from "@chakra-ui/react";
import IPokemon from "types/pokemon";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: IPokemon[];
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

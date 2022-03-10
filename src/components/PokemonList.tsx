import { SimpleGrid } from "@chakra-ui/react";
import { GetPokemons } from "types/GetPokemons";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: GetPokemons["pokemons"];
  isSSG?: boolean;
}

const PokemonList = ({ pokemons, isSSG }: PokemonListProps) => {
  return (
    <SimpleGrid spacing={{ base: 2, md: 4 }} columns={{ base: 1, md: 2 }}>
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} data={pokemon} isSSG={isSSG} />
      ))}
    </SimpleGrid>
  );
};

export default PokemonList;

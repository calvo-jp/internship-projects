import { Grid, GridItem } from "@chakra-ui/react";
import IPokemon from "types/pokemon";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: IPokemon[];
  isSSG?: boolean;
}

const PokemonList = ({ pokemons, isSSG }: PokemonListProps) => {
  return (
    <Grid
      gap={4}
      flexWrap="wrap"
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
      }}
    >
      {pokemons.map((pokemon) => (
        <GridItem key={pokemon.id}>
          <PokemonCard data={pokemon} isSSG={isSSG} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default PokemonList;

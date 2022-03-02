import IPokemon from "types/pokemon";

type Dict = Record<string, any>;

export default function normalizePokemonObject(data: Dict): IPokemon {
  try {
    return {
      id: data.id,
      name: data.name,
      image:
        data.sprites.other.dream_world.front_default ||
        data.sprites.front_default,
      types: data.types.map((type: Dict) => type.type.name),
      abilities: data.abilities.map((ability: Dict) =>
        ability.ability.name.replace(/-/g, " ")
      ),
      moves: data.moves
        .map((move: Dict) => move.move.name.replace(/-/g, " "))
        .slice(0, 10),
      stats: data.stats.map((stat: Dict) => ({
        value: stat.base_stat,
        name: stat.stat.name.replace(/-/g, " "),
      })),
      experience: data.base_experience,
      weight: data.weight,
      height: data.height,
      __original__: data,
    };
  } catch (e) {
    throw new Error("Something happened while parsing object");
  }
}

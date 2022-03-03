import IPokemon from "types/pokemon";

type Dict = Record<string, any>;

export default function normalizePokemonObject(data: Dict): IPokemon {
  // Checking missing keys in debug mode
  if (process.env.NODE_ENV === "development") {
    const keys: (keyof IPokemon)[] = [
      "id",
      "name",
      "image",
      "types",
      "abilities",
      "moves",
      "stats",
      "experience",
      "weight",
      "height",
    ];

    for (const key of keys) {
      if (!data[key]) console.error("Missing " + key);
    }
  }

  try {
    return {
      id: data.id,
      name: data.name,
      image:
        data.sprites.other.dream_world.front_default ||
        data.sprites.front_default ||
        defaultImage,
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
      experience: data.base_experience || 0,
      weight: data.weight,
      height: data.height,
      __original__: data,
    };
  } catch (e) {
    throw new Error("Something happened while parsing object");
  }
}

const defaultImage = "/pokeball.png";

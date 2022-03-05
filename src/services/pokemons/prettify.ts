import IPokemon from "types/pokemon";

type Dictionary = Record<string, any>;

export default function prettify(data: Dictionary): IPokemon {
  const defaultImage = "/pokeball.png";

  return {
    id: data.id,
    name: data.name,
    image: unsafeCoalesce(
      data.sprites.other.dream_world.front_default,
      data.sprites.other.home.front_default,
      data.sprites.front_default,
      defaultImage
    ),
    types: data.types.map((type: Dictionary) => type.type.name),
    abilities: data.abilities.map((ability: Dictionary) =>
      unKebabCase(ability.ability.name)
    ),
    moves: data.moves
      .map((move: Dictionary) => unKebabCase(move.move.name))
      .slice(0, 10),
    stats: data.stats.map((stat: Dictionary) => ({
      value: stat.base_stat,
      name: unKebabCase(stat.stat.name),
    })),
    experience: unsafeCoalesce(data.base_experience, 0),
    weight: data.weight,
    height: data.height,
  };
}

const unsafeCoalesce = (...args: any) => {
  for (const arg of args) if (!!arg) return arg;
};

const unKebabCase = (subject: string) => {
  return subject.replace(/[a-z0-9]-[a-z0-9]/gi, (m) => m.replace(/-/, " "));
};

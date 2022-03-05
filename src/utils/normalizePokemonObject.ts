import IPokemon from "types/pokemon";

type Dict = Record<string, any>;

export default function normalizePokemonObject(data: Dict): IPokemon {
  return {
    id: data.id,
    name: data.name,
    image: unsafeCoalesce(
      data.sprites.other.dream_world.front_default,
      data.sprites.other.home.front_default,
      data.sprites.front_default,
      defaultImage
    ),
    types: data.types.map((type: Dict) => type.type.name),
    abilities: data.abilities.map((ability: Dict) =>
      normalizeKebab(ability.ability.name)
    ),
    moves: data.moves
      .map((move: Dict) => normalizeKebab(move.move.name))
      .slice(0, 10),
    stats: data.stats.map((stat: Dict) => ({
      value: stat.base_stat,
      name: normalizeKebab(stat.stat.name),
    })),
    experience: unsafeCoalesce(data.base_experience, 0),
    weight: data.weight,
    height: data.height,
  };
}

const unsafeCoalesce = (...args: any) => {
  for (const arg of args) if (!!arg) return arg;
};

const normalizeKebab = (subject: string) => {
  return subject.replace(/[a-z0-9]-[a-z0-9]/gi, (m) => m.replace(/-/, " "));
};

const defaultImage = "/pokeball.png";

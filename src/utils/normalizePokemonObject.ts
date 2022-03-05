import IPokemon from "types/pokemon";

type Dictionary = Record<string, any>;

const isDictionary = (subject: any): subject is Dictionary => {
  const tag = "[object Object]";

  return (
    Object(subject) === subject &&
    Object.prototype.toString.call(subject) === tag
  );
};

export default function normalizePokemonObject(data: unknown): IPokemon {
  if (!isDictionary(data)) throw new Error("Invalid pokemon object");

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
      normalizeKebab(ability.ability.name)
    ),
    moves: data.moves
      .map((move: Dictionary) => normalizeKebab(move.move.name))
      .slice(0, 10),
    stats: data.stats.map((stat: Dictionary) => ({
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

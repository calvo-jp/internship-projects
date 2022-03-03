import IPokemon from "types/pokemon";

type Dict = Record<string, any>;

export default function normalizePokemonObject(data: Dict): IPokemon {
  try {
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
  } catch (e) {
    throw new Error("Something happened while parsing object");
  }
}

const unsafeCoalesce = (...args: any): any => {
  for (const arg of args) if (!!arg) return arg;
};

const normalizeKebab = (subject: string) => {
  return subject.replace(/-/g, " ").trim();
};

const defaultImage = "/pokeball.png";

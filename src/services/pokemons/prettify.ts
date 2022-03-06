import IPokemon from "types/pokemon";
import isObject from "utils/isObject";

type Dict = Record<string, any>;

const DEFAULT_IMG = "/pokeball.png";

const prettify = (data: any): IPokemon => {
  if (!isObject(data)) throw new Error("Unable to prettify data");

  return {
    id: data.id,
    name: data.name,
    image: unsafeCoalesce(
      data.sprites.other.dream_world.front_default,
      data.sprites.other.home.front_default,
      data.sprites.front_default,
      DEFAULT_IMG
    ),
    types: data.types.map((type: Dict) => type.type.name),
    abilities: data.abilities
      .map((ability: Dict) => ability.ability.name)
      .map(unKebabCase),
    moves: data.moves
      .map((move: Dict) => move.move.name)
      .map(unKebabCase)
      .slice(0, 10),
    stats: data.stats.map((stat: Dict) => ({
      value: stat.base_stat,
      name: unKebabCase(stat.stat.name),
    })),
    experience: unsafeCoalesce(data.base_experience, 0),
    weight: data.weight,
    height: data.height,
  };
};

const unsafeCoalesce = (...args: any) => {
  for (const arg of args) if (!!arg) return arg;
};

const unKebabCase = (subject: string) => {
  return subject.replace(/[a-z0-9]-[a-z0-9]/gi, (m) => m.replace(/-/, " "));
};

export default prettify;

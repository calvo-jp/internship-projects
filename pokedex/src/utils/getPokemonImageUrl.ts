const getPokemonImageUrl = (id: number | string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
};

export default getPokemonImageUrl;

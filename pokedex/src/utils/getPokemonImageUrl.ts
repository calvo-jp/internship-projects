type ImageType = "SVG" | "PNG";

const getPokemonImageUrl = (id: number | string) => {
  const ext = ".svg";
  const cdn =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

  return cdn + id + ext;
};

export default getPokemonImageUrl;

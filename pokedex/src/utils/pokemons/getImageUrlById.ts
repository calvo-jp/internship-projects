const getImageUrlById = (id: number | string, type?: "PNG" | "SVG") => {
  const ext = type === "PNG" ? ".png" : ".svg";
  const cdn =
    type === "PNG"
      ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/"
      : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/";

  return cdn + id + ext;
};

export default getImageUrlById;

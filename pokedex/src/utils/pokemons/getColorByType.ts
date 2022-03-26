interface Config {
  /**
   *
   * whether it should be on dark surface or light
   *
   */
  mode?: "dark" | "light";
  /**
   *
   * color to use if nothing matches with given type
   *
   */
  fallback?: string;
}

const getColorByType = (type: string, config: Config = {}) => {
  const dark = config.mode === "dark";

  switch (type.toLowerCase().trim()) {
    case "normal":
      return dark ? "#a1a07875" : "#535336b8";
    case "fire":
      return dark ? "#db4c0094" : "#db4c00e6";
    case "water":
      return dark ? "#497ce7d6" : "#497ce7f2";
    case "grass":
      return dark ? "#5bb32f94" : "#56ae29";
    case "electric":
      return dark ? "#bd9a0ac2" : "#c8a208";
    case "ice":
      return dark ? "#5dada994" : "#5dada9";
    case "fighting":
      return dark ? "#d3484394" : "#f42c25b8";
    case "poison":
      return dark ? "#681a6794" : "#800e7ec9";
    case "ground":
      return dark ? "#997e3994" : "#9f7b20cc";
    case "flying":
      return dark ? "#6c50bd94" : "#4f25c8b5";
    case "psychic":
      return dark ? "#d9457294" : "#d94572e0";
    case "bug":
      return dark ? "#8a9b1194" : "#a4bb00";
    case "rock":
      return dark ? "#917d1b94" : "#6f5e0bb3";
    case "ghost":
      return dark ? "#b276ff94" : "#b276ff";
    case "dark":
      return dark ? "#85604894" : "#856048c7";
    case "dragon":
      return dark ? "#7e49ff94" : "#7e49ff";
    case "steel":
      return dark ? "#b2b2d166" : "#8888ae";
    case "fairy":
      return dark ? "#e374ab94" : "#e374ab";
    default:
      return config.fallback
        ? config.fallback
        : dark
        ? "brand.gray.600"
        : "brand.gray.500";
  }
};

export default getColorByType;

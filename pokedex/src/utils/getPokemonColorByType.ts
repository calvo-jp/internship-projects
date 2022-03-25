const getPokemonColorByType = (type: string, defaultColor?: string) => {
  switch (type.toLowerCase().trim()) {
    case "normal":
      return "#a1a07875";
    case "fire":
      return "#db4c0094";
    case "water":
      return "#497ce7d6";
    case "grass":
      return "#5bb32f94";
    case "electric":
      return "#bd9a0ac2";
    case "ice":
      return "#5dada994";
    case "fighting":
      return "#d3484394";
    case "poison":
      return "#681a6794";
    case "ground":
      return "#997e3994";
    case "flying":
      return "#6c50bd94";
    case "psychic":
      return "#d9457294";
    case "bug":
      return "#8a9b1194";
    case "rock":
      return "#917d1b94";
    case "ghost":
      return "#b276ff94";
    case "dark":
      return "#85604894";
    case "dragon":
      return "#7e49ff94";
    case "steel":
      return "#b2b2d166";
    case "fairy":
      return "#e374ab94";
    default:
      return defaultColor;
  }
};

export default getPokemonColorByType;

const getPokemonColorByType = (type: string) => {
  switch (type.toLowerCase().trim()) {
    case "normal":
      return "brand.gray.600";
    case "fire":
      return "#F08030";
    case "water":
      return "#537EC5";
    case "grass":
      return "#3e8b17";
    case "electric":
      return "#FFD700";
    case "ice":
      return "#128989";
    case "fighting":
      return "#C03028";
    case "poison":
      return "#A040A0";
    case "ground":
      return "#E0C068";
    case "flying":
      return "#8968ef";
    case "psychic":
      return "#a9256e";
    case "bug":
      return "#A8B820";
    case "rock":
      return "#B8A038";
    case "ghost":
      return "#705898";
    case "dark":
      return "#705848";
    case "dragon":
      return "#442d7c";
    case "steel":
      return "#767373";
    case "fairy":
      return "#F0B6BC";
    default:
      return "";
  }
};

export default getPokemonColorByType;

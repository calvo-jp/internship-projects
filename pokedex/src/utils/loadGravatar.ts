import sha256 from "./sha256";

const loadGravatar = (email: string) => {
  return "https://www.gravatar.com/avatar/" + sha256(email) + "?d=retro&s=150";
};

export default loadGravatar;

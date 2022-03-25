const loadGravatar = (email: string) => {
  return "https://www.gravatar.com/avatar/" + sha256(email) + "?d=retro&s=150";
};

const sha256 = async (text: string) => {
  const utf8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};

export default loadGravatar;

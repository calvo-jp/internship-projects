import YoutubeSearchResult from "./types";

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const search = async (...search: string[]): Promise<YoutubeSearchResult> => {
  const q = [search].flat().join("%20");

  const endpoint = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${q}&type=video&key=${GOOGLE_API_KEY}`;

  const response = await fetch(endpoint);

  if (!response.ok) {
    console.log(await response.json());
    throw new Error(response.statusText);
  }

  return await response.json();
};

const youtube = {
  search,
};

export default youtube;

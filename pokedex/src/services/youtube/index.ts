import cleanValues from "utils/cleanValues";
import YoutubeSearchResult from "./types";

interface SearchConfig {
  query: string | string[];
  /** next or previous page token returned after first query */
  token?: string;
}

const search = async (config: SearchConfig): Promise<YoutubeSearchResult> => {
  const q = [config.query].flat();
  const pageToken = config.token;

  const params = new URLSearchParams(
    cleanValues({
      q,
      key,
      type,
      pageToken,
      maxResults,
    })
  );

  const response = await fetch(`${endpoint}?${params.toString()}`);

  // youtube's success or error response is in json
  const o = await response.json();

  if (!response.ok) throw new Error(o.message);

  return o;
};

const getApiKey = () => {
  const debug = process.env.NODE_ENV === "development";
  if (debug) return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_0!;
  return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
};

const key = getApiKey();
const type = "video";
const maxResults = 8; /* limiting to 8 inorder not to hit quota early */
const endpoint = "https://youtube.googleapis.com/youtube/v3/search";

const youtube = {
  search,
};

export default youtube;

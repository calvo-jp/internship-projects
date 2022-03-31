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
      part,
      pageToken,
      maxResults,
      videoDuration,
      videoEmbeddable,
      relevanceLanguage,
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
  // I have five yoube API keys for dev
  // namely NEXT_PUBLIC_YOUTUBE_API_KEY_[1,2,3,4,5]
  // due to youtube's really small YT quota
  if (debug) return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY_0!;
  return process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
};

const key = getApiKey();
const type = "video";
const part = "snippet";
const maxResults = 8; /* limiting to 8 inorder not to hit quota early */
const videoDuration = "short";
const videoEmbeddable = "true";
const relevanceLanguage = "en";

const endpoint = "https://youtube.googleapis.com/youtube/v3/search";

const youtube = {
  search,
};

export default youtube;

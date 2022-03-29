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

const key = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
const type = "video";
const maxResults = 10; /* limiting to 10 inorder not to hit quota early */
const endpoint = "https://youtube.googleapis.com/youtube/v3/search";

const youtube = {
  search,
};

export default youtube;

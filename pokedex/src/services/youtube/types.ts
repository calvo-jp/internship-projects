interface YoutubeSearchResult {
  etag: string;
  kind: string;
  items: Item[];
  pageInfo: PageInfo;
  regionCode: string;
  nextPageToken: string;
  previousPageToken: string;
}

interface PageInfo {
  resultsPerPage: number;
  totalResults: number;
}

interface Item {
  id: Id;
  etag: string;
  kind: string;
  snippet: Snippet;
}

interface Id {
  kind: string;
  videoId: string;
}

interface Snippet {
  channelId: string;
  channelTitle: string;
  title: string;
  description: string;
  publishTime: string;
  publishedAt: string;
  thumbnails: Record<"default" | "high" | "medium", Thumbnail>;
  liveBroadcastContent: string;
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export default YoutubeSearchResult;

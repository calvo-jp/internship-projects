const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

interface PaginationQuery {
  limit: number;
  offset: number;
}

interface PaginatedResult {
  count: number;
  next?: string;
  previous?: string;
  results: {
    name: string;
    url: string;
  }[];
}

const provider = {
  read: {
    async all(query?: Partial<PaginationQuery>): Promise<PaginatedResult> {
      const { limit = 10, offset = 0 } = query || {};

      const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
      const response = await fetch(endpoint);

      if (!response.ok) throw new Error(response.statusText);

      return await response.json();
    },

    async one(id: string): Promise<Record<string, any>> {
      const endpoint = `${API_BASE_URL}/${id}`;
      const response = await fetch(endpoint);

      if (!response.ok) throw new Error(response.statusText);

      return await response.json();
    },
  },
};

export default provider;

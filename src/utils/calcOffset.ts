interface Config {
  /** Current page number or index */
  page?: string;
  limit?: number;
}

const calcOffset = ({ page, limit = 100 }: Config) => {
  if (!page) return 1;

  let offset: number;

  offset = parseInt(page);
  offset = !Number.isNaN(offset) && offset >= 1 ? offset : 1;
  offset = (offset - 1) * limit;

  return offset;
};

export default calcOffset;

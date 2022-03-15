interface IPost {
  id: number | string;
  body: string;
  title: string;
  tags: string[];

  // TODO: change to date
  createdAt: string;
}

export default IPost;

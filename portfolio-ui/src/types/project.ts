interface IProject {
  id: string | number;
  title: string;
  body: string;
  tags: string[];
  image: string;
  isFeatured?: boolean;

  // TODO: change type to year
  createdAt: string;
}

export default IProject;

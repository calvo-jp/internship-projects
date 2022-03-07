import IPost from "types/post";

const read = {
  async all(): Promise<IPost[]> {
    return [
      {
        id: 1,
        title: "Creating pixel perfect icons in Figma",
        body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        tags: ["Figma", "Icon Design"],
        createdAt: "12 Feb 2020",
      },
      {
        id: 2,
        title: "Making a design system from scratch",
        body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        tags: ["Design", "Pattern"],
        createdAt: "12 Feb 2020",
      },
    ];
  },
};

const postsServices = {
  read,
};

export default postsServices;

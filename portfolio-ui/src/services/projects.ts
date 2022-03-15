import IProject from "types/project";

const read = {
  async all(): Promise<IProject[]> {
    return [
      {
        id: 1,
        title: "Designing Dashboards",
        body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        tags: ["Dashboard"],
        image: "/images/attachments/dashboard.png",
        isFeatured: true,
        createdAt: "2020",
      },
      {
        id: 2,
        title: "Vibrant Portraits of 2020",
        body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        tags: ["Illustration"],
        image: "/images/attachments/illustration.png",
        isFeatured: true,
        createdAt: "2018",
      },
      {
        id: 3,
        title: "36 Days of Malayalam type",
        body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        tags: ["Typography"],
        image: "/images/attachments/typography.png",
        isFeatured: true,
        createdAt: "2018",
      },
      {
        id: 4,
        title: "Components",
        body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        tags: ["Components", "Design"],
        createdAt: "2018",
        image: "/images/attachments/components.png",
      },
      {
        id: 5,
        title: "Designing Landing pages",
        body: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
        tags: ["Website"],
        createdAt: "2020",
        image: "/images/attachments/website.png",
      },
    ];
  },
};

const projectsServices = {
  read,
};

export default projectsServices;

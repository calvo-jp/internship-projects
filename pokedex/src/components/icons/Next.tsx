import * as React from "react";

const NextIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M20 22v-20h2v20h-2zm-18 0l16-10-16-10v20z" />
    </svg>
  );
};

export default NextIcon;

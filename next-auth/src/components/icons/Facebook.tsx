import { ComponentProps } from "react";

const FacebookIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      {...props}
    >
      <path d="M13 0C5.82 0 0 5.82 0 13c0 6.518 4.801 11.899 11.057 12.839v-9.394H7.84v-3.417h3.217v-2.274c0-3.765 1.834-5.417 4.963-5.417 1.498 0 2.291.111 2.666.162v2.983h-2.134c-1.328 0-1.792 1.259-1.792 2.679v1.868h3.893l-.528 3.417H14.76v9.422C21.105 25.006 26 19.581 26 13c0-7.18-5.82-13-13-13z"></path>
    </svg>
  );
};

export default FacebookIcon;

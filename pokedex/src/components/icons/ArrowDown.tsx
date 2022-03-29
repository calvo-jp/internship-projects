import { ComponentProps } from "react";

const ArrowDownIcon = (props: ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M12 21l-12-18h24z" />
    </svg>
  );
};

export default ArrowDownIcon;

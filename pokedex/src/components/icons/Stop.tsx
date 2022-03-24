import * as React from "react";

const StopIcon = (props: React.ComponentProps<"svg">) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M2 2h20v20h-20z" />
    </svg>
  );
};

export default StopIcon;

import { useCallback, useEffect } from "react";

interface InfiniteScrollProps {
  callback: () => void;
  disabled?: boolean;
}

export default function InfiniteScroll({
  callback,
  disabled,
}: InfiniteScrollProps) {
  const handleScroll = useCallback(() => {
    if (!disabled && isScrolledToBottom()) callback();
  }, [callback, disabled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return <></>;
}

const isScrolledToBottom = () => {
  return (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight -
      32 /* <- don't wait for scrollbar to hit the bottom, fetch in advance */
  );
};

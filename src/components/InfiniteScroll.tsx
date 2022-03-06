import { useCallback, useEffect } from "react";

interface InfiniteScrollProps {
  callback: () => void;
  disabled?: boolean;
}

const InfiniteScroll = ({ callback, disabled }: InfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    if (!disabled && isScrolledToBottom()) callback();
  }, [callback, disabled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return <></>;
};

const isScrolledToBottom = () => {
  const actualHeight = document.body.offsetHeight;

  const consumedHeight =
    /* viewport height */
    window.innerHeight +
    /* number of px scrolled vertically */
    window.pageYOffset +
    /* don't wait for scrollbar to hit the bottom, fetch in advance */
    75;

  return consumedHeight >= actualHeight;
};

export default InfiniteScroll;

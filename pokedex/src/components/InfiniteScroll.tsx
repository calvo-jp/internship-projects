import { useCallback, useEffect } from "react";

interface InfiniteScrollProps {
  paused?: boolean;
  callback: () => void;
}

const InfiniteScroll = ({ callback, paused }: InfiniteScrollProps) => {
  const handleScroll = useCallback(() => {
    if (paused) return;
    if (isScrolledToBottom()) callback();
  }, [callback, paused]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return null;
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

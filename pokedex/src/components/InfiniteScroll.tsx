import * as React from "react";

interface InfiniteScrollProps {
  callback?: () => void;
  paused?: boolean;
}

const InfiniteScroll = ({ callback, paused }: InfiniteScrollProps) => {
  const handleScroll = React.useCallback(() => {
    if (!paused && isScrolledToBottom() && callback) callback();
  }, [callback, paused]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return <React.Fragment />;
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

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

enum Status {
  waiting,
  started,
  complte,
}

const PageLoader = () => {
  const router = useRouter();
  const [status, setStatus] = React.useState(Status.waiting);

  const handleStart = () => setStatus(Status.started);
  const handleComplete = () => {
    setStatus(Status.complte);
    setTimeout(() => setStatus(Status.waiting), 100);
  };

  React.useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router.events]);

  // hide loader when generating new pages or on error
  if (router.isFallback) return <React.Fragment />;

  return (
    <Box
      position="fixed"
      zIndex={99}
      left={0}
      top={0}
      h={0.5}
      w={status === Status.complte ? "full" : "50%"}
      hidden={status === Status.waiting}
      bgGradient="linear(to right, pink.400, red.300, pink.300)"
      transition="all"
      transitionDuration="150ms"
    />
  );
};

export default PageLoader;

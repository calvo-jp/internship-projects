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

  // Conceal loader when generating new pages or probably an error
  if (router.isFallback) return <React.Fragment />;

  return (
    <Box
      position="fixed"
      // TODO: change this
      bgColor="red"
      hidden={status === Status.waiting}
      transition="all"
      transitionDuration="30ms"
      left={0}
      top={0}
      zIndex={99}
      w={status === Status.complte ? "full" : "50%"}
      h={1}
    />
  );
};

export default PageLoader;

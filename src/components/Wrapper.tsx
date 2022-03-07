import { Container } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const Wrapper = (props: PropsWithChildren<{}>) => {
  return (
    <Container maxW="900px" p={{ base: 4, md: 8 }}>
      {props.children}
    </Container>
  );
};

export default Wrapper;

import { Flex, FlexProps } from "@chakra-ui/react";
import * as React from "react";

interface TreeProps {
  divider?: any;
}

const Tree = ({ children, divider, ...props }: TreeProps & FlexProps) => {
  const array = React.Children.toArray(children);
  const length = array.length;

  return (
    <Flex align="center" gap={2} {...props}>
      {React.Children.map(array, (child, index) => {
        if (!divider) return child;

        return (
          <React.Fragment>
            {child}
            {length > index + 1 && divider}
          </React.Fragment>
        );
      })}
    </Flex>
  );
};

export default Tree;

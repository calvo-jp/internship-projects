import { Box, BoxProps, GridProps } from "@chakra-ui/react";
import * as React from "react";

interface GridTableProps {
  columns: GridProps["templateColumns"];
}

const GridTable = ({
  columns,
  children,
  ...props
}: GridTableProps & BoxProps) => {
  const array = React.Children.toArray(children);

  return (
    <Box {...props}>
      {React.Children.map(array, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          templateColumns: columns,
          alignItems: "center",
        });
      })}
    </Box>
  );
};

export default GridTable;

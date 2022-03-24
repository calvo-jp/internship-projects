import { Grid, GridProps } from "@chakra-ui/react";

const GridTableRow = ({ children, ...props }: GridProps) => {
  return <Grid {...props}>{children}</Grid>;
};

export default GridTableRow;

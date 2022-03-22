import { Grid, GridProps } from "@chakra-ui/react";

const GridTableRow = ({ children, ...props }: GridProps) => {
  return (
    <Grid borderColor="brand.gray.50" {...props}>
      {children}
    </Grid>
  );
};

export default GridTableRow;

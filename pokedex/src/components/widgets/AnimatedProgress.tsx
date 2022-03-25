import { Progress, ProgressProps } from "@chakra-ui/react";
import * as React from "react";

type AnimatedProgressProps = ProgressProps;

const AnimatedProgress = ({
  value: maxValue,
  ...props
}: AnimatedProgressProps) => {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (maxValue && value < maxValue) setValue((old) => old + 1);
  }, [maxValue, value]);

  React.useEffect(() => () => setValue(0), []);

  return <Progress value={value} {...props} />;
};

export default AnimatedProgress;

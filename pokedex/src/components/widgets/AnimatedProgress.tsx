import { Progress, ProgressProps } from "@chakra-ui/react";
import * as React from "react";

type AnimatedProgressProps = ProgressProps;

const AnimatedProgress = ({ value, ...props }: AnimatedProgressProps) => {
  const [target, setTarget] = React.useState(0);

  const increment = React.useCallback(() => {
    if (value && target < value) setTarget((old) => old + 1);
  }, [target, value]);

  React.useEffect(() => {
    increment();
  }, [increment]);

  React.useEffect(() => () => setTarget(0), []);

  return <Progress value={target} {...props} />;
};

export default AnimatedProgress;

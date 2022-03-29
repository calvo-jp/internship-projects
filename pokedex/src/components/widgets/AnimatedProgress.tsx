import { Progress, ProgressProps } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

type AnimatedProgressProps = ProgressProps;

const AnimatedProgress = ({ value, ...props }: AnimatedProgressProps) => {
  const [target, setTarget] = useState(0);

  const increment = useCallback(() => {
    if (value && target < value) setTarget((old) => old + 1);
  }, [target, value]);

  useEffect(() => increment(), [increment]);
  useEffect(() => () => setTarget(0), []);

  return <Progress value={target} {...props} />;
};

export default AnimatedProgress;

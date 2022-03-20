import { Box, Image } from "@chakra-ui/react";
import valx from "utils/valx";

interface Size {
  /** width in pixels */
  width: number;
  /** height in pixels */
  height: number;
}

interface Placement {
  x: "left" | "right";
  y: "top" | "bottom";
}

interface Position {
  /** horizontal position in degress */
  x: number;
  /** vertical position in pixels */
  y: number;
}

interface BackgroundImage {
  src: string;
  size?: Size;
  position: Position;
  placement: Placement;
  /** rotation in degrees */
  rotation: number;
}

const Background = () => {
  return (
    <Box position="absolute" w="full" h="full" top={0} left={0}>
      {backgroundImgs.map(({ src, size, position, placement, rotation }) => (
        <Image
          key={src}
          src={src}
          alt=""
          position="absolute"
          top={valx({
            [`${position.y}px`]: placement.y === "top",
          })}
          bottom={valx({
            [`${position.y}px`]: placement.y === "bottom",
          })}
          left={valx({
            [`${position.x}%`]: placement.x === "left",
          })}
          right={valx({
            [`${position.x}%`]: placement.x === "right",
          })}
          width={valx({
            [`${size?.width}px`]: !!size,
          })}
          height={valx({
            [`${size?.height}px`]: !!size,
          })}
          transform={`rotate(${rotation}deg)`}
        />
      ))}
    </Box>
  );
};

const backgroundImgs: BackgroundImage[] = [
  {
    src: "/assets/pokeball-lg.png",
    position: {
      x: 0,
      y: 0,
    },
    placement: {
      x: "right",
      y: "top",
    },
    rotation: 0,
  },
  {
    src: "/assets/pokeball-sm.png",
    position: {
      x: 0,
      y: 51,
    },
    placement: {
      x: "left",
      y: "bottom",
    },
    rotation: 0,
  },
  {
    src: "/assets/icons/fire.svg",
    size: {
      width: 40,
      height: 51,
    },
    position: {
      x: 11.4,
      y: 372,
    },
    placement: {
      x: "left",
      y: "bottom",
    },
    rotation: 20.05,
  },
  {
    src: "/assets/icons/electric.svg",
    size: {
      width: 54,
      height: 56,
    },
    position: {
      x: 0.175,
      y: 273,
    },
    placement: {
      x: "left",
      y: "bottom",
    },
    rotation: 8.37,
  },
  {
    src: "/assets/icons/metal.svg",
    size: {
      width: 38,
      height: 33,
    },
    position: {
      x: 13.5,
      y: 230,
    },
    placement: {
      x: "left",
      y: "bottom",
    },
    rotation: 0,
  },
  {
    src: "/assets/icons/grass.svg",
    size: {
      width: 65,
      height: 89,
    },
    position: {
      x: 4.8,
      y: 45,
    },
    placement: {
      x: "left",
      y: "bottom",
    },
    rotation: 0,
  },
  {
    src: "/assets/icons/steel.svg",
    size: {
      width: 36,
      height: 44,
    },
    position: {
      x: 21,
      y: 34,
    },
    placement: {
      x: "left",
      y: "bottom",
    },
    rotation: -25.7,
  },
  {
    src: "/assets/icons/stone.svg",
    size: {
      width: 27,
      height: 30,
    },
    position: {
      x: 5,
      y: 354.33,
    },
    placement: {
      x: "right",
      y: "bottom",
    },
    rotation: 22.96,
  },
  {
    src: "/assets/icons/fairy.svg",
    size: {
      width: 38,
      height: 56,
    },
    position: {
      x: 9.12,
      y: 186,
    },
    placement: {
      x: "right",
      y: "bottom",
    },
    rotation: -27.98,
  },
  {
    src: "/assets/icons/poison.svg",
    size: {
      width: 34,
      height: 52,
    },
    position: {
      x: 0.9,
      y: 120,
    },
    placement: {
      x: "right",
      y: "bottom",
    },
    rotation: 14.5,
  },
  {
    src: "/assets/icons/water.svg",
    size: {
      width: 59,
      height: 100,
    },
    position: {
      x: 13,
      y: 37,
    },
    placement: {
      x: "right",
      y: "bottom",
    },
    rotation: 0,
  },
];

export default Background;

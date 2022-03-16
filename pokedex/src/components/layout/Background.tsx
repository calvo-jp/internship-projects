import { Box, Image } from "@chakra-ui/react";

type Size = [
  /** width in pixels */
  width: number,
  /** height in pixels */
  height: number
];

type Position = [
  /** position left or right in percentage */
  leftOrRight: number,
  /** position bottom in pixels */
  bottom: number
];

type Item = [
  /** name of svg */
  name: string,
  size: Size,
  posit: Position,
  /** how many degrees should we rotate the element */
  rotate: number,
  anchor: "left" | "right"
];

const Background = () => {
  const items: Item[] = [
    // left
    ["fire", [40, 51], [10, 350], 20.05, "left"],
    ["electric", [54, 56], [2, 270], 8.37, "left"],
    ["metal", [38, 33], [12, 229], 0, "left"],
    ["grass", [65, 89], [5, 45], 0, "left"],
    ["steel", [36, 44], [18, 33], -25.7, "left"],
    // right
    ["stone", [27, 30], [6, 354], 22.96, "right"],
    ["fairy", [38, 56], [9, 185], -27.98, "right"],
    ["poison", [34, 52], [3, 120], 14.5, "right"],
    ["water", [59, 100], [15, 37], 0, "right"],
  ];

  return (
    <Box position="absolute" w="full" h="full" top={0} left={0}>
      <Image
        src="/assets/pokeball-lg.png"
        alt=""
        position="absolute"
        right={0}
        top={0}
      />

      <Image
        src="/assets/pokeball-sm.png"
        alt=""
        position="absolute"
        left={0}
        bottom={0}
      />

      {items.map(
        ([
          name,
          [width, height],
          [verticalPosition, bottomPos],
          rotate,
          anchor,
        ]) => {
          const isAnchoredLeft = anchor === "left";

          return (
            <Image
              key={name}
              src={`/assets/icons/${name}.svg`}
              alt=""
              w={`${width}px`}
              h={`${height}px`}
              left={isAnchoredLeft ? `${verticalPosition}%` : undefined}
              right={!isAnchoredLeft ? `${verticalPosition}%` : undefined}
              bottom={`${bottomPos}px`}
              position="absolute"
              transform={`rotate(${rotate}deg)`}
            />
          );
        }
      )}
    </Box>
  );
};

export default Background;

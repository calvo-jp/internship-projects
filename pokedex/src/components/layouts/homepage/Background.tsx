import { Box, Image } from "@chakra-ui/react";

type Item = [
  /**
   * name of svg
   * will be used to link to the asset in public dir
   * eg. "fire" -> "/assets/icons/fire.svg"
   */
  name: string,
  /** size in pixels */
  size: [width: number, height: number],
  position: [
    /**
     * position left or right in percentage (or left: <number>%)
     * values here were calculated using the vw (1440px) found in figma
     * and the margin left or right of each background icons.
     * website used to calculate percent values can be found
     * at https://www.pixelconverter.com/
     */
    leftOrRight: number,
    /** position bottom in pixels (or bottom: <number>px) */
    bottom: number
  ],
  /** how many degrees should we rotate the element */
  rotate: number,
  /** the horiz pos where the element should be placed */
  anchor: "left" | "right"
];

const Background = () => {
  const items: Item[] = [
    // left
    ["fire", [40, 51], [11.4, 372], 20.05, "left"],
    ["electric", [54, 56], [0.175, 273], 8.37, "left"],
    ["metal", [38, 33], [13.5, 230], 0, "left"],
    ["grass", [65, 89], [4.8, 45], 0, "left"],
    ["steel", [36, 44], [21, 34], -25.7, "left"],
    // right
    ["stone", [27, 30], [5, 354], 22.96, "right"],
    ["fairy", [38, 56], [9.12, 186], -27.98, "right"],
    ["poison", [34, 52], [0.9, 120], 14.5, "right"],
    ["water", [59, 100], [13, 37], 0, "right"],
  ];

  return (
    <Box position="absolute" w="full" h="full" top={0} left={0}>
      <Image
        src="/assets/pokeball-lg.png"
        alt=""
        position="absolute"
        right={0}
        top={-16}
      />

      <Image
        src="/assets/pokeball-sm.png"
        alt=""
        position="absolute"
        left={0}
        bottom={4}
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

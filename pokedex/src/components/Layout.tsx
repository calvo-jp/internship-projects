import { Box, Image } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import Header from "./Header";

const Layout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <>
      <Box bgColor="#111827" color="#ffffff" minH="100vh">
        <Header />

        <Box position="relative">
          <Box
            as="main"
            position="relative"
            zIndex="1"
            maxW="container.lg"
            mx="auto"
            p={{ base: 4, lg: 12 }}
            bgColor="transparent"
          >
            {children}
          </Box>

          <Background />
        </Box>
      </Box>
    </>
  );
};

type Item = [
  name: string,
  size: [width: number, height: number],
  posit: [leftOrRight: number, bottom: number],
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

export default Layout;

import { Box, Icon, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import FacebookIcon from "./icons/Facebook";
import InstagramIcon from "./icons/Instagram";
import LinkedInIcon from "./icons/Linkedin";
import TwitterIcon from "./icons/Twitter";

const Footer = () => {
  const icons = [FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon];

  return (
    <Box as="footer" p={8} mt={16}>
      <VStack spacing={4}>
        <Wrap spacing={4}>
          {icons.map((SVGIcon, index) => (
            <WrapItem key={index}>
              <a href="#" target="_blank" rel="noreferrer">
                <Icon as={SVGIcon} w={30} h={30} />
              </a>
            </WrapItem>
          ))}
        </Wrap>

        <Text fontSize="14px">Copyright ©2020 All rights reserved</Text>
      </VStack>
    </Box>
  );
};

export default Footer;

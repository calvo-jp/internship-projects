import { Box, Icon, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import FacebookIcon from "./icons/Facebook";
import InstagramIcon from "./icons/Instagram";
import LinkedInIcon from "./icons/Linkedin";
import TwitterIcon from "./icons/Twitter";

const Footer = () => {
  const icons = [FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon];

  return (
    <Box as="footer" p={12} mt={24}>
      <VStack spacing={6}>
        <Wrap spacing={9}>
          {icons.map((SVGIcon, index) => (
            <WrapItem key={index}>
              <Icon as={SVGIcon} w={30} h={30} />
            </WrapItem>
          ))}
        </Wrap>

        <Text fontSize="sm">Copyright &copy;2020 All rights reserved</Text>
      </VStack>
    </Box>
  );
};

export default Footer;

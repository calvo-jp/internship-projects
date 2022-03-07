import { Box, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import FacebookIcon from "./icons/Facebook";
import InstagramIcon from "./icons/Instagram";
import LinkedInIcon from "./icons/Linkedin";
import TwitterIcon from "./icons/Twitter";

const Footer = () => {
  return (
    <Box as="footer" p={8} mt={16}>
      <VStack spacing={4}>
        <Wrap>
          <WrapItem>
            <FacebookIcon />
          </WrapItem>
          <WrapItem>
            <InstagramIcon />
          </WrapItem>
          <WrapItem>
            <TwitterIcon />
          </WrapItem>
          <WrapItem>
            <LinkedInIcon />
          </WrapItem>
        </Wrap>

        <Text fontSize="14px">Copyright ©2020 All rights reserved</Text>
      </VStack>
    </Box>
  );
};

export default Footer;

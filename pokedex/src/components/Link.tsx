import {
  Link as ChackraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { PropsWithChildren } from "react";

interface LinkProps extends ChakraLinkProps {
  href: string;
}

const Link = ({ children, href, ...props }: PropsWithChildren<LinkProps>) => {
  return (
    <NextLink passHref href={href}>
      <ChackraLink color="brand.primary" {...props}>
        {children}
      </ChackraLink>
    </NextLink>
  );
};

export default Link;

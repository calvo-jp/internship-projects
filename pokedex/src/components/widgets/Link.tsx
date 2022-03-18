import {
  Link as ChackraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

interface LinkProps extends ChakraLinkProps {
  href: string;
}

/**
 *
 * @description
 * Integration of Chakra's Link and NextJS' Link.
 *
 * @example
 * <Link href="/me" color="blue.400">Profile</Link>
 *
 */
const Link = ({
  href,
  children,
  ...props
}: React.PropsWithChildren<LinkProps>) => {
  return (
    <NextLink passHref href={href}>
      <ChackraLink color="brand.primary" {...props}>
        {children}
      </ChackraLink>
    </NextLink>
  );
};

export default Link;

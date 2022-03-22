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
 * Integration of Chakra's Link and NextJS' Link.
 *
 * @example
 * <Link href="/me" color="blue.400">Profile</Link>
 *
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <NextLink passHref href={href}>
        <ChackraLink color="brand.primary" ref={ref} {...props}>
          {children}
        </ChackraLink>
      </NextLink>
    );
  }
);

Link.displayName = "Link";
export default Link;

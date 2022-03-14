import { Box, Button, Wrap, WrapItem } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const logout = async () => {
    await signOut({
      callbackUrl: "/login",
    });
  };

  return (
    <Box
      p={8}
      pos="fixed"
      left={0}
      top="75px"
      bottom={0}
      w="300px"
      bgColor="white"
    >
      <Wrap
        direction="column"
        textTransform="uppercase"
        fontSize="lg"
        fontWeight="light"
      >
        <SidebarLink href="/admin/dashboard" label="Dashboard" />
        <SidebarLink href="/admin/account" label="Account" />

        <WrapItem>
          <Box
            as="button"
            onClick={logout}
            fontSize="lg"
            fontWeight="light"
            textTransform="uppercase"
          >
            Logout
          </Box>
        </WrapItem>
      </Wrap>
    </Box>
  );
};

interface SidebarLinkProps {
  href: string;
  label: string;
}

const SidebarLink = ({ href, label }: SidebarLinkProps) => {
  const { pathname } = useRouter();

  return (
    <WrapItem color={pathname.startsWith(href) ? "brand.red" : ""}>
      <Link href={href}>
        <a>{label}</a>
      </Link>
    </WrapItem>
  );
};

export default Sidebar;

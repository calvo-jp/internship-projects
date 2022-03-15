import { Box, Wrap, WrapItem } from "@chakra-ui/react";
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
      as="nav"
      p={8}
      w="300px"
      pos="fixed"
      top="75px"
      left={0}
      bottom={0}
      bgColor="white"
    >
      <Wrap direction="column">
        <SidebarLink label="Dashboard" href="/admin/dashboard" />
        <SidebarLink label="Account" href="/admin/account" />
        <SidebarLink label="Logout" onClick={logout} />
      </Wrap>
    </Box>
  );
};

interface SidebarLinkProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

const SidebarLink = ({ href, label, onClick }: SidebarLinkProps) => {
  const { pathname } = useRouter();

  const active = href && pathname.startsWith(href);
  const content = (
    <Box as="a" cursor="pointer">
      {label}
    </Box>
  );

  return (
    <WrapItem
      color={active ? "brand.red" : ""}
      onClick={onClick}
      fontSize="lg"
      fontWeight="light"
      textTransform="uppercase"
    >
      {!href && content}
      {href && (
        <Link href={href} passHref>
          {content}
        </Link>
      )}
    </WrapItem>
  );
};

export default Sidebar;

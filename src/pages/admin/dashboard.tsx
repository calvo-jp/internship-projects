import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  StackProps,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Header from "components/Header";
import BasketIcon from "components/icons/Basket";
import DollarIcon from "components/icons/Dollar";
import UsersIcon from "components/icons/Users";
import Layout from "components/Layout";
import Sidebar from "components/Sidebar";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Fragment } from "react";
import sha256 from "utils/sha256";

const Dashboard = () => {
  const { status } = useSession({ required: true });

  if (status === "loading") return <Loader />;

  return (
    <>
      <Head>
        <title>NextJS Auth | Dashboard</title>
      </Head>

      <Layout>
        <Box flexGrow={1} p={8}>
          <Heading color="gray.700">Dashboard</Heading>

          <SimpleGrid columns={3} mt={4} spacing={4} color="white">
            <Card
              bgGradient="linear(to-r, #F97316, #F59E0B)"
              icon={DollarIcon}
              label="Total Profit"
              value="100, 000"
            />

            <Card
              bgGradient="linear(to-r, #10B981, #14B8A6)"
              icon={BasketIcon}
              label="Total Adopted"
              value="109"
            />

            <Card
              bgGradient="linear(to-r, #FB7185, #EC4899)"
              icon={UsersIcon}
              label="Unique Visitors"
              value="1, 015"
            />
          </SimpleGrid>
        </Box>
      </Layout>
    </>
  );
};

interface CardProps {
  label: string;
  value: string;
  icon: typeof DollarIcon;
}

const Card = ({
  label,
  value,
  icon: SVGIcon,
  ...all
}: CardProps & StackProps) => {
  return (
    <HStack
      bgGradient="linear(to-r, #F97316, #F59E0B)"
      p={8}
      rounded="sm"
      shadow="md"
      spacing={4}
      {...all}
    >
      <Icon as={SVGIcon} w={20} h={16} fill="white" />

      <Box>
        <Text>{label}</Text>
        <Heading>{value}</Heading>
      </Box>
    </HStack>
  );
};

const Loader = () => {
  return (
    <Box fontSize="sm" p={4}>
      Loading...
    </Box>
  );
};

export default Dashboard;

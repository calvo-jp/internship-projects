import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import BasketIcon from "components/icons/Basket";
import DollarIcon from "components/icons/Dollar";
import UsersIcon from "components/icons/Users";
import Layout from "components/Layout";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Dashboard = () => {
  const { status } = useSession({ required: true });

  if (status === "loading") return <Loader />;

  return (
    <>
      <Head>
        <title>NextJS Auth | Dashboard</title>
      </Head>

      <Layout>
        <VStack flexGrow={1} p={8} align="start" spacing={4}>
          <Heading color="gray.700">Dashboard</Heading>
          <Cards />
        </VStack>
      </Layout>
    </>
  );
};

const Cards = () => {
  return (
    <SimpleGrid columns={3} spacing={4} color="white">
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

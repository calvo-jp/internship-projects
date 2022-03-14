import {
  Box,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  StackProps,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
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
        <VStack flexGrow={1} p={8} align="start" spacing={8}>
          <Heading color="gray.700">Dashboard</Heading>
          <Cards />
        </VStack>
      </Layout>
    </>
  );
};

const Cards = () => {
  return (
    <SimpleGrid columns={3} spacing={4} color="white" w="full">
      <Card
        bgGradient="linear(to-r, #F97316, #F59E0B)"
        icon={DollarIcon}
        label="Total Profit"
        value="10.5k"
      />

      <Card
        bgGradient="linear(to-r, #10B981, #14B8A6)"
        icon={BasketIcon}
        label="Total Adopted"
        value="115"
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

const Card = ({ label, value, icon, ...all }: CardProps & StackProps) => {
  return (
    <HStack
      p={8}
      bgGradient="linear(to-r, #F97316, #F59E0B)"
      rounded="sm"
      shadow="md"
      spacing={4}
      {...all}
    >
      <Icon as={icon} w={20} h={16} fill="white" />

      <Box>
        <Text>{label}</Text>
        <Text fontSize="4xl" fontWeight="bold" lineHeight={1}>
          {value}
        </Text>
      </Box>
    </HStack>
  );
};

const Loader = () => {
  return (
    <Box fontSize="sm" p={4} color="gray.500">
      Loading...
    </Box>
  );
};

export default Dashboard;

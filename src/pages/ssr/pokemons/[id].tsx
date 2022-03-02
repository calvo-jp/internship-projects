import { Avatar, Box } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import IPokemon from "types/pokemon";
import getPokemon from "utils/getPokemon";

interface Props {
  data: IPokemon;
}

interface Params {
  [key: string]: string;
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const data = await getPokemon(params?.id);

  return !data ? { notFound: true } : { props: { data } };
};

const Pokemon: NextPage<Props> = ({ data }) => {
  console.log(data);

  return (
    <div>
      <PokemonWidget data={data} />
    </div>
  );
};

interface WidgetProps {
  data: IPokemon;
}

const PokemonWidget = (data: WidgetProps) => {
  return (
    <Box>
      <Avatar />
    </Box>
  );
};

const WidgetHeader = (props: WidgetProps) => {
  return <Box></Box>;
};

export default Pokemon;

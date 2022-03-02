import PokemonWidget from "components/PokemonWidget";
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
  return <PokemonWidget data={data} />;
};

export default Pokemon;

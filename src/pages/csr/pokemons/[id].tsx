import { useQuery } from "@apollo/client";
import Error from "components/Error";
import Loader from "components/Loader";
import Pokemon from "components/Pokemon";
import { GET_POKEMON } from "graphql/queries";
import useSearchParams from "hooks/useSearchParams";
import Head from "next/head";
import { GetPokemon, GetPokemonVariables } from "types/GetPokemon";

const PokemonPage = () => {
  const id = useSearchParams("id").get("id");

  const { data, loading, error } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    {
      skip: !isNumeric(id),
      variables: { id: parseInt(id!) },
      pollInterval: 1000 * 60 * 1, // 1hr
    }
  );

  if (loading) return <Loader />;
  if (error) return <InternalError />;
  if (!data?.pokemon) return <NotFound />;

  return (
    <>
      <Head>
        <title>(CSR) Pokedex | {data.pokemon.name}</title>
      </Head>

      <Pokemon data={data.pokemon} redirectUrl="/csr/pokemons" />
    </>
  );
};

const NotFound = () => {
  return (
    <Error
      title="ERROR 404"
      message="The page you are looking for does not exist"
      redirect="/csr/pokemons"
    />
  );
};

const InternalError = () => {
  return (
    <Error
      title="ERROR 503"
      message="Something went wrong."
      redirect="/csr/pokemons"
    />
  );
};

const isNumeric = (subject: any): subject is string => {
  return typeof subject === "string" && /^[0-9]+$/.test(subject);
};

export default PokemonPage;

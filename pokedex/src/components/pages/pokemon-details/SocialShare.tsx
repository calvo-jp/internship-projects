import { useQuery } from "@apollo/client";
import { Flex, HStack, Icon } from "@chakra-ui/react";
import FacebookIcon from "components/icons/Facebook";
import LinkedInIcon from "components/icons/LinkedIn";
import TwitterIcon from "components/icons/Twitter";
import { GET_POKEMON } from "graphql/pokeapi/queries";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "next-share";
import { GetPokemon, GetPokemonVariables } from "__generated__/GetPokemon";

interface SocialsShareProps {
  /** pokemon id */
  id: number;
}

const baseUrl = "https://internship-project-pokedex.vercel.app/og/pokemons/";

const SocialShare = ({ id }: SocialsShareProps) => {
  const { loading, data, error } = useQuery<GetPokemon, GetPokemonVariables>(
    GET_POKEMON,
    { variables: { id } }
  );

  if (loading) return null;
  if (!data?.pokemon) return null;

  const url = baseUrl + data.pokemon.id;

  return (
    <HStack>
      <FacebookShareButton
        url={url}
        hashtag={data.pokemon.name}
        windowWidth={400}
        windowHeight={400}
      >
        <ShareButton icon={FacebookIcon} />
      </FacebookShareButton>
      <TwitterShareButton
        url={url}
        hashtags={[data.pokemon.name]}
        windowWidth={400}
        windowHeight={400}
      >
        <ShareButton icon={TwitterIcon} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} windowWidth={400} windowHeight={400}>
        <ShareButton icon={LinkedInIcon} />
      </LinkedinShareButton>
    </HStack>
  );
};

interface ShareButtonProps {
  icon: (props: React.ComponentProps<"svg">) => JSX.Element;
}

const ShareButton = ({ icon }: ShareButtonProps) => {
  return (
    <Flex
      w={8}
      h={8}
      align="center"
      justify="center"
      rounded="full"
      bgColor="brand.gray.800"
    >
      <Icon w={3} h={3} as={icon} fill="white" />
    </Flex>
  );
};

export default SocialShare;
